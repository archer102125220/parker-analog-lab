import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { TranslocoService, getBrowserLang } from '@jsverse/transloco';
import { type RouteMeta } from '@analogjs/router';

const AVAILABLE_LANGS = ['zh-TW', 'en'] as const;
type AvailableLang = (typeof AVAILABLE_LANGS)[number];

function isAvailableLang(lang: string): lang is AvailableLang {
  return (AVAILABLE_LANGS as readonly string[]).includes(lang);
}

export const routeMeta: RouteMeta = {
  canActivate: [
    (route, state) => {
      const router = inject(Router);
      const lang = route.paramMap.get('lang') ?? '';
      if (!isAvailableLang(lang)) {
        // 如果網址的第一個部分不符合語系，代表可能少加語系或路徑錯誤。
        // 保留原網址路徑，前面加上瀏覽器的預設語系，讓未匹配的頁面正確掉進 [...not-found].page.ts
        const browserLang = getBrowserLang() ?? '';
        const targetLang = browserLang.startsWith('en') ? 'en' : 'zh-TW';
        return router.parseUrl(`/${targetLang}${state.url}`);
      }
      return true;
    },
  ],
};

@Component({
  selector: 'app-lang-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LangLayoutComponent {
  private readonly translocoService = inject(TranslocoService);
  private readonly route = inject(ActivatedRoute);

  constructor() {
    /**
     * Step 1：從 snapshot 同步讀取初始語系。
     * 確保在 template 首次渲染前（F5、SSR）已設定好正確語系。
     */
    const initLang = this.route.snapshot.paramMap.get('lang') ?? 'zh-TW';
    this.translocoService.setActiveLang(initLang);

    /**
     * Step 2：訂閱 paramMap 的後續變化。
     * Angular Router 在 path param 改變時會 reuse 此元件而非重建，
     * 因此需要獨立訂閱來處理客戶端語系切換（/zh-TW → /en）。
     * takeUntilDestroyed() 確保元件銷毀時自動退訂，避免記憶體洩漏。
     */
    this.route.paramMap.pipe(
      map((p) => p.get('lang') ?? 'zh-TW'),
      distinctUntilChanged(),
      takeUntilDestroyed(),
    ).subscribe((lang) => {
      if (this.translocoService.getActiveLang() !== lang) {
        this.translocoService.setActiveLang(lang);
      }
    });
  }
}

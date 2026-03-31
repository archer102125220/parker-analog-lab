import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { type RouteMeta } from '@analogjs/router';
import { getBrowserLang } from '@jsverse/transloco';

const AVAILABLE_LANGS = ['zh-TW', 'en'] as const;
type AvailableLang = (typeof AVAILABLE_LANGS)[number];
const DEFAULT_LANG: AvailableLang = 'zh-TW';

/**
 * 將瀏覽器語系對應至支援的語系代碼。
 * - zh / zh-TW / zh-HK / zh-SG → 'zh-TW'
 * - en / en-US / en-GB / ...    → 'en'
 * - 其他所有語系                 → 'zh-TW'（預設）
 */
function resolveTargetLang(): AvailableLang {
  const browserLang = getBrowserLang() ?? '';

  if (browserLang.startsWith('zh')) {
    return 'zh-TW';
  }
  if (browserLang.startsWith('en')) {
    return 'en';
  }
  return DEFAULT_LANG;
}

export const routeMeta: RouteMeta = {
  /**
   * 訪問 `/` 時立即 redirect 到 `/{browserLang}`。
   * 此 guard 在 SSR 環境下 `getBrowserLang()` 會回傳 undefined，
   * 因此 fallback 到 DEFAULT_LANG。
   */
  canActivate: [
    () => {
      const router = inject(Router);
      const targetLang = resolveTargetLang();
      return router.createUrlTree([targetLang]);
    },
  ],
};

/** 此元件不會實際被渲染，canActivate guard 會在渲染前完成 redirect。 */
@Component({
  standalone: true,
  template: '',
})
export default class RootRedirectComponent {}

import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@jsverse/transloco';

interface LangOption {
  code: string;
  label: string;
}

const LANG_OPTIONS: LangOption[] = [
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'en',    label: 'English'  },
];

/** 💡 這邊是示意 NgModule 的寫法，因此不使用 standalone: true */
@Component({
  selector: 'app-header',
  standalone: false, // 必須明確指定 false，因為 Angular 19+ 預設為 standalone: true
  template: `
    <header class="header">
      <div class="header-inner">
        <a class="header-logo" [routerLink]="['/', activeLang()]">
          <img class="header-logo-icon" src="/img/logo/Analog.jsLab.v.09.webp" alt="Analog Logo" />
          <span class="header-logo-text">{{ 'header.title' | transloco }}</span>
        </a>

        <nav class="header-nav">
          <!-- Language Switcher -->
          <button
            mat-button
            class="header-lang-btn"
            [matMenuTriggerFor]="langMenu"
          >
            <mat-icon class="header-lang-btn-icon">language</mat-icon>
            <span class="header-lang-btn-label">{{ activeLangLabel() }}</span>
            <mat-icon class="header-lang-btn-arrow">keyboard_arrow_down</mat-icon>
          </button>

          <mat-menu #langMenu="matMenu" class="header-lang-menu">
            @for (lang of langOptions; track lang.code) {
              <button
                mat-menu-item
                class="header-lang-menu-item"
                [attr.css-is-active]="activeLang() === lang.code ? 'true' : null"
                (click)="switchLang(lang.code)"
              >
                {{ lang.label }}
              </button>
            }
          </mat-menu>
        </nav>
      </div>
    </header>
  `,
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly translocoService = inject(TranslocoService);
  private readonly router = inject(Router);

  readonly langOptions = LANG_OPTIONS;

  /**
   * 訂閱 TranslocoService.langChanges$ 取代 signal() 快照。
   * 確保每次 setActiveLang() 被呼叫（不論來源），
   * Header 的語系顯示和 active 狀態都能即時同步。
   */
  readonly activeLang = toSignal(this.translocoService.langChanges$, {
    initialValue: this.translocoService.getActiveLang(),
  });

  readonly activeLangLabel = computed(
    () => LANG_OPTIONS.find(l => l.code === this.activeLang())?.label ?? this.activeLang()
  );

  /**
   * 切換語系：用 Router.navigate 把 URL 的第一個路徑段（lang prefix）替換掉，
   * 其餘子路徑保留不變。
   *
   * 例如：/zh-TW/components → /en/components
   *
   * activeLang 會透過 langChanges$ 自動更新，不需要手動 set。
   */
  switchLang(code: string): void {
    const urlTree = this.router.parseUrl(this.router.url);
    const segments = urlTree.root.children['primary']?.segments ?? [];
    const subPath = segments.slice(1).map(s => s.path);
    this.router.navigate([code, ...subPath]);
  }
}

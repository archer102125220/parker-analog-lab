import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
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
        <a class="header-logo" href="/">
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

  readonly langOptions = LANG_OPTIONS;
  readonly activeLang = signal(this.translocoService.getActiveLang());

  readonly activeLangLabel = computed(
    () => LANG_OPTIONS.find(l => l.code === this.activeLang())?.label ?? this.activeLang()
  );

  switchLang(code: string): void {
    this.translocoService.setActiveLang(code);
    this.activeLang.set(code);
  }
}


import { Component, ChangeDetectionStrategy } from '@angular/core';

/** 💡 這邊是示意 NgModule 的寫法，因此不使用 standalone: true */
@Component({
  selector: 'app-header',
  standalone: false, // 必須明確指定 false，因為 Angular 19+ 預設為 standalone: true
  template: `
    <header class="header">
      <div class="header-inner">
        <a class="header-logo" href="/">
          <img class="header-logo-icon" src="/analog.svg" alt="Analog Logo" />
          <span class="header-logo-text">Parker 的 Analog實驗室</span>
        </a>
        <nav class="header-nav">
          <!-- Reserved for future navigation links -->
        </nav>
      </div>
    </header>
  `,
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}

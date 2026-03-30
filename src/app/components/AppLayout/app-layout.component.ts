import { Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  standalone: true,
  template: `
    <div class="app-layout">
      <header class="app-layout__header">
        <div class="app-layout__header-inner">
          <a class="app-layout__logo" href="/">
            <img class="app-layout__logo-icon" src="/analog.svg" alt="Analog Logo" />
            <span class="app-layout__logo-text">Analog Lab</span>
          </a>
          <nav class="app-layout__nav">
            <!-- Reserved for future navigation links -->
          </nav>
        </div>
      </header>
      <main class="app-layout__main">
        <ng-content />
      </main>
      <footer class="app-layout__footer">
        <div class="app-layout__footer-inner">
          <p class="app-layout__footer-text">© 2026 Parker Chen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `,
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent implements OnInit {
  ngOnInit(): void {}
}

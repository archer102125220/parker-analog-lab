import { Component, ChangeDetectionStrategy } from '@angular/core';

/** 💡 這邊是示意 NgModule 的寫法，因此不使用 standalone: true */
@Component({
  selector: 'app-footer',
  standalone: false, // 必須明確指定 false，因為 Angular 19+ 預設為 standalone: true
  template: `
    <footer class="footer">
      <div class="footer-inner">
        <p class="footer-text">© {{ currentYear }} Parker Chen. All rights reserved.</p>
      </div>
    </footer>
  `,
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
}

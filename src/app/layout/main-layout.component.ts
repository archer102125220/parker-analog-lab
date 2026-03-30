import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderModule } from '../components/Layout/Header/header.module';
import { FooterModule } from '../components/Layout/Footer/footer.module';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [HeaderModule, FooterModule],
  template: `
    <div class="main_layout">
      <app-header />
      <main class="main_layout-main">
        <ng-content />
      </main>
      <app-footer />
    </div>
  `,
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {}

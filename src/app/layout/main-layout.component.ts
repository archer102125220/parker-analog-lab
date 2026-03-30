import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderModule } from '@/app/components/Layout/Header/header.module';
import { FooterModule } from '@/app/components/Layout/Footer/footer.module';

@Component({
  selector: 'main-layout',
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

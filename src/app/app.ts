import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppLayoutComponent } from './components/AppLayout/app-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppLayoutComponent],
  template: `
    <app-layout>
      <router-outlet />
    </app-layout>
  `,
  styles: [],
})
export class App {}

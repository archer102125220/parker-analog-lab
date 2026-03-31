import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { HeaderComponent } from './header.component';

/** 💡 示意 Single Component Angular Module (SCAM) 寫法 */
@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, TranslocoPipe, MatButtonModule, MatMenuModule, MatIconModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}


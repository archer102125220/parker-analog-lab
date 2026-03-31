import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import { FooterComponent } from './footer.component';

/** 💡 示意 Single Component Angular Module (SCAM) 寫法 */
@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, TranslocoPipe],
  exports: [FooterComponent],
})
export class FooterModule {}

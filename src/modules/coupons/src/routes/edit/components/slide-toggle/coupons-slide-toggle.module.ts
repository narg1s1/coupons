import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeCouponsSlideToggleComponent } from './coupons-slide-toggle.component';


@NgModule({
  declarations: [
    PeCouponsSlideToggleComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PeCouponsSlideToggleComponent,
  ],
})
export class PeCouponsSlideToggleModule {}
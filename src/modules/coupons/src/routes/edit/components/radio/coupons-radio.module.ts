import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeCouponsRadioComponent } from './coupons-radio.component';
import { PeCouponsRadioGroupDirective } from './coupons-radio-group.directive';


@NgModule({
  declarations: [
    PeCouponsRadioComponent,

    PeCouponsRadioGroupDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PeCouponsRadioComponent,

    PeCouponsRadioGroupDirective,
  ],
})
export class PeCouponsRadioModule {}
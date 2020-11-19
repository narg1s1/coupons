import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PeCouponsFormFieldComponent } from './coupons-form-field.component';

import { PeCouponsPrefixDirective } from './coupons-prefix.directive';
import { PeCouponsSuffixDirective } from './coupons-suffix.directive';


@NgModule({
  declarations: [
    PeCouponsFormFieldComponent,

    PeCouponsPrefixDirective,
    PeCouponsSuffixDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PeCouponsFormFieldComponent,

    PeCouponsPrefixDirective,
    PeCouponsSuffixDirective
  ],
})
export class PeCouponsFormFieldModule {}

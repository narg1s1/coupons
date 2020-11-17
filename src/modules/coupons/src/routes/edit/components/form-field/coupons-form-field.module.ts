import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeCouponsFormFieldComponent } from './coupons-form-field.component';

import { PeCouponsLabelDirective } from './coupons-label.directive';
import { PeCouponsPrefixDirective } from './coupons-prefix.directive';
import { PeCouponsSubscriptDirective } from './coupons-subscript.directive';
import { PeCouponsSuffixDirective } from './coupons-suffix.directive';


@NgModule({
  declarations: [
    PeCouponsFormFieldComponent,

    PeCouponsLabelDirective,
    PeCouponsPrefixDirective,
    PeCouponsSubscriptDirective,
    PeCouponsSuffixDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PeCouponsFormFieldComponent,

    PeCouponsLabelDirective,
    PeCouponsPrefixDirective,
    PeCouponsSubscriptDirective,
    PeCouponsSuffixDirective,
  ],
})
export class PeCouponsFormFieldModule {}
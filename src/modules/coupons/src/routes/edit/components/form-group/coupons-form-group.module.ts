import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PeCouponsFormGroupComponent } from './coupons-form-group.component';
import { PeCouponsLabelDirective } from './coupons-label.directive';
import { PeCouponsSubscriptDirective } from './coupons-subscript.directive';


@NgModule({
  declarations: [
    PeCouponsFormGroupComponent,

    PeCouponsLabelDirective,
    PeCouponsSubscriptDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PeCouponsFormGroupComponent,

    PeCouponsLabelDirective,
    PeCouponsSubscriptDirective
  ],
})
export class PeCouponsFormGroupModule {}

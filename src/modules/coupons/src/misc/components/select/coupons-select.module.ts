import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSelectModule } from '@angular/material/select';

import { PeCouponsSelectComponent } from './coupons-select.component';


@NgModule({
  declarations: [
    PeCouponsSelectComponent,
  ],
  imports: [
    CommonModule,

    MatSelectModule,
  ],
  exports: [
    PeCouponsSelectComponent,
  ],
})
export class PeCouponsSelectModule {}
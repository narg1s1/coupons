import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PeCouponsListItemComponent } from './coupons-list-item.component';
import { PeCouponsListComponent } from './coupons-list.component';


@NgModule({
  declarations: [
    PeCouponsListComponent,
    PeCouponsListItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PeCouponsListComponent,
    PeCouponsListItemComponent
  ]
})
export class PeCouponsListModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule,
  MatSortModule,
  MatMenuModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatDividerModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule
} from '@angular/material';

import { DataGridModule } from '@pe/ng-kit/modules/data-grid';
import { GridModule } from '@pe/ng-kit/modules/grid';
import { TableModule } from '@pe/ng-kit/src/kit/table';
import { WindowService } from '@pe/ng-kit/modules/window';
import { LayoutModule } from '@pe/ng-kit/modules/layout';
import { BadgeModule } from '@pe/ng-kit/modules/badge';
import { ModalModule } from '@pe/ng-kit/modules/modal';
import { FormModule } from '@pe/ng-kit/modules/form';

import { CouponsRoutingModule } from './coupons-routing.module';
import {
  CouponLayoutComponent,
  CouponGridComponent,
  CouponDuplicateComponent,
  CouponEditComponent,
  CouponRemoveComponent,
} from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSortModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,

    TableModule,
    GridModule,
    DataGridModule,
    LayoutModule,
    BadgeModule,
    ModalModule,
    FormModule,

    CouponsRoutingModule
  ],
  declarations: [
    CouponLayoutComponent,
    CouponGridComponent,
    CouponDuplicateComponent,
    CouponEditComponent,
    CouponRemoveComponent
  ],
  providers: [ WindowService ]
})
export class CouponsAppModule {
}

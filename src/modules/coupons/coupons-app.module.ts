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
import { FormModule } from '@pe/ng-kit/modules/form';
import { DialogModule} from '@pe/ng-kit/modules/dialog';

import { CouponsRoutingModule } from './coupons-routing.module';
import {
  CouponLayoutComponent,
  CouponGridComponent,
  CouponDuplicateComponent,
  CouponEditComponent,
  CouponRemoveComponent,
  CouponCreateComponent
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
    FormModule,
    DialogModule,

    CouponsRoutingModule
  ],
  declarations: [
    CouponLayoutComponent,
    CouponGridComponent,
    CouponDuplicateComponent,
    CouponEditComponent,
    CouponRemoveComponent,
    CouponCreateComponent
  ],
  providers: [ WindowService ],
  entryComponents: [
    CouponCreateComponent,
    CouponEditComponent,
    CouponDuplicateComponent,
    CouponRemoveComponent
  ]
})
export class CouponsAppModule {
}

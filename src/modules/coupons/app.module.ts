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
  MatDividerModule
} from '@angular/material';

import { DataGridModule } from '@pe/ng-kit/modules/data-grid';
import { GridModule } from '@pe/ng-kit/modules/grid';
import { TableModule } from '@pe/ng-kit/src/kit/table';
import { WindowService } from '@pe/ng-kit/modules/window';
import { LayoutModule } from '@pe/ng-kit/modules/layout';
import { BadgeModule } from '@pe/ng-kit/modules/badge';

import { CouponsRoutingModule } from './coupons-routing.module';
import { LayoutComponent, GridComponent } from './components';

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

    TableModule,
    GridModule,
    DataGridModule,
    LayoutModule,
    BadgeModule,

    CouponsRoutingModule
  ],
  declarations: [ LayoutComponent, GridComponent ],
  providers: [ WindowService ]
})
export class CouponsAppModule {
}

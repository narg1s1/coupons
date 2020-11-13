import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { PebViewerModule } from '@pe/builder-viewer';
import { PeDataGridModule } from '@pe/data-grid';

import { PeCouponsRouteModule } from './coupons.routing';
import { PeCouponsSharedModule } from './coupons.shared';

import { PeCouponsIconAddComponent } from './misc/icons/add-image'

import { PeCouponsGridComponent } from './routes/grid/coupons-grid.component';
import { PeCouponsComponent } from './routes/_root/coupons-root.component';
import { PeCouponsEditComponent } from './routes/edit/coupons-edit.component';


// HACK: fix --prod build
// https://github.com/angular/angular/issues/23609
export const PebViewerModuleForRoot: any = PebViewerModule.forRoot();

const icons = [
  PeCouponsIconAddComponent,
];

@NgModule({
  imports: [
    PeCouponsRouteModule,
    PeCouponsSharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCardModule,
    MatChipsModule,
    MatCheckboxModule,
    PebViewerModuleForRoot,
    NgScrollbarModule,
    PeDataGridModule,
  ],
  declarations: [
    ...icons,
    PeCouponsComponent,
    PeCouponsGridComponent,
    PeCouponsEditComponent,
  ],
  providers: [
    // ShopResolver,
  ],
})
export class PeCouponsModule {}

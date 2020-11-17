import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { PebViewerModule } from '@pe/builder-viewer';
import { PeDataGridModule } from '@pe/data-grid';

import { PeCouponsRouteModule } from './coupons.routing';
import { PeCouponsSharedModule } from './coupons.shared';

import { PeCouponsIconAddComponent } from './misc/icons/add'
import { PeCouponsIconDateComponent } from './misc/icons/date';
import { PeCouponsIconMagentoComponent } from './misc/icons/magento';
import { PeCouponsIconPointOfSaleComponent } from './misc/icons/point-of-sale';
import { PeCouponsIconShopComponent } from './misc/icons/shop';
import { PeCouponsIconTimeComponent } from './misc/icons/time';

import { PeCouponsFormFieldModule } from './routes/edit/components/form-field/coupons-form-field.module';
import { PeCouponsFormGroupModule } from './routes/edit/components/form-group/coupons-form-group.module';
import { PeCouponsRadioModule } from './routes/edit/components/radio/coupons-radio.module';
import { PeCouponsSlideToggleModule } from './routes/edit/components/slide-toggle/coupons-slide-toggle.module';

import { PeCouponsComponent } from './routes/_root/coupons-root.component';
import { PeCouponsCheckboxModule } from './routes/edit/components/checkbox/coupons-checkbox.module';
import { PeCouponsEditComponent } from './routes/edit/coupons-edit.component';
import { PeCouponsGridComponent } from './routes/grid/coupons-grid.component';


// HACK: fix --prod build
// https://github.com/angular/angular/issues/23609
export const PebViewerModuleForRoot: any = PebViewerModule.forRoot();

const icons = [
  PeCouponsIconAddComponent,
  PeCouponsIconDateComponent,
  PeCouponsIconMagentoComponent,
  PeCouponsIconPointOfSaleComponent,
  PeCouponsIconShopComponent,
  PeCouponsIconTimeComponent
];

@NgModule({
  imports: [
    PeCouponsCheckboxModule,
    PeCouponsFormFieldModule,
    PeCouponsFormGroupModule,
    PeCouponsRadioModule,
    PeCouponsSlideToggleModule,

    PeCouponsRouteModule,
    PeCouponsSharedModule,

    PebViewerModuleForRoot,
    PeDataGridModule,

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
    NgScrollbarModule,
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

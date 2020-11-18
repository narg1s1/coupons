import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';

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

import { PeCouponsAutocompleteModule } from './routes/edit/components/autocomplete/coupons-autocomplete.module';
import { PeCouponsCheckboxModule } from './routes/edit/components/checkbox/coupons-checkbox.module';
import { PeCouponsFormFieldModule } from './routes/edit/components/form-field/coupons-form-field.module';
import { PeCouponsFormGroupModule } from './routes/edit/components/form-group/coupons-form-group.module';
import { PeCouponsInputModule } from './routes/edit/components/input/coupons-input.module';
import { PeCouponsListModule } from './routes/edit/components/list/coupons-list.module';
import { PeCouponsRadioModule } from './routes/edit/components/radio/coupons-radio.module';
import { PeCouponsSlideToggleModule } from './routes/edit/components/slide-toggle/coupons-slide-toggle.module';

import { PeCouponsComponent } from './routes/_root/coupons-root.component';
import { PeCouponsEditComponent } from './routes/edit/coupons-edit.component';
import { PeCouponsGridComponent } from './routes/grid/coupons-grid.component';

import { NgScrollbarModule } from 'ngx-scrollbar';


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
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    PeCouponsAutocompleteModule,
    PeCouponsCheckboxModule,
    PeCouponsFormFieldModule,
    PeCouponsFormGroupModule,
    PeCouponsRadioModule,
    PeCouponsInputModule,
    PeCouponsListModule,
    PeCouponsSlideToggleModule,

    PeCouponsRouteModule,
    PeCouponsSharedModule,

    PebViewerModuleForRoot,
    PeDataGridModule,

    NgScrollbarModule
  ],
  declarations: [
    ...icons,
    PeCouponsComponent,
    PeCouponsGridComponent,
    PeCouponsEditComponent
  ],
  providers: [
    // ShopResolver,
  ],
})
export class PeCouponsModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

import { PeCouponsAutocompleteModule } from './misc/components/autocomplete/coupons-autocomplete.module';
import { PeCouponsCheckboxModule } from './misc/components/checkbox/coupons-checkbox.module';
import { PeCouponsFormFieldModule } from './misc/components/form-field/coupons-form-field.module';
import { PeCouponsFormGroupModule } from './misc/components/form-group/coupons-form-group.module';
import { PeCouponsInputModule } from './misc/components/input/coupons-input.module';
import { PeCouponsListModule } from './misc/components/list/coupons-list.module';
import { PeCouponsRadioModule } from './misc/components/radio/coupons-radio.module';
import { PeCouponsSelectModule } from './misc/components/select/coupons-select.module';
import { PeCouponsSlideToggleModule } from './misc/components/slide-toggle/coupons-slide-toggle.module';

import { PeCouponsComponent } from './routes/root/coupons-root.component';
import { PeCouponsEditComponent } from './routes/edit/coupons-edit.component';
import { PeCouponsGridComponent } from './routes/grid/coupons-grid.component';

import { PeCouponsApi } from './services/abstract.coupons.api';
import { ActualPeCouponsApi } from './services/actual.coupons.api';

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
    PeCouponsSelectModule,
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
  providers: [],
})
export class PeCouponsModule {}

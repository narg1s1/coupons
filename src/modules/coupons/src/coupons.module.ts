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
import { PeCouponsDatepickerModule } from './misc/components/datepicker/coupons-datepicker.module';
// import { PeCouponsFormGroupModule } from './misc/components/form-group/coupons-form-group.module';
import { PeCouponsInputModule } from './misc/components/input/coupons-input.module';
import { PeCouponsListModule } from './misc/components/list/coupons-list.module';
import { PeCouponsRadioModule } from './misc/components/radio/coupons-radio.module';
import { PeCouponsSelectModule } from './misc/components/select/coupons-select.module';
import { PeCouponsSlideToggleModule } from './misc/components/slide-toggle/coupons-slide-toggle.module';

import { PeCouponsComponent } from './routes/root/coupons-root.component';
import { PeCouponsEditComponent } from './routes/edit/coupons-edit.component';
import { PeCouponsGridComponent } from './routes/grid/coupons-grid.component';

import { NgScrollbarModule } from 'ngx-scrollbar';
import { AuthModule } from '@pe/auth';
import { PeOverlayService } from './misc/components/overlay/overlay.service';


import { PeCouponsFormComponent } from './routes/form/coupons-form.component';

import { PeCouponsExpansionPanelComponent } from './misc/components/coupons-expansion-panel/coupons-expansion-panel.component';
import { PeCouponsFormFieldComponent } from './misc/components/coupons-form-field/coupons-form-field.component';

import { PeCouponsFormFieldLabelDirective } from './misc/components/coupons-form-field/coupons-form-field-label.directive';
import { PeCouponsFormFieldPrefixDirective } from './misc/components/coupons-form-field/coupons-form-field-prefix.directive';
import { PeCouponsFormFieldSuffixDirective } from './misc/components/coupons-form-field/coupons-form-field-suffix.directive';
import { PeCouponsFormFieldSubscriptDirective } from './misc/components/coupons-form-field/coupons-form-field-subscript.directive';
import { PeCouponsFormGroupComponent } from './misc/components/coupons-form-group/coupons-form-group.component';


// HACK: fix --prod build
// https://github.com/angular/angular/issues/23609
export const PebViewerModuleForRoot: any = PebViewerModule.forRoot();

const components = [
  PeCouponsExpansionPanelComponent,
  PeCouponsFormFieldComponent,
  PeCouponsFormGroupComponent,
]

const directives = [
  PeCouponsFormFieldPrefixDirective,
  PeCouponsFormFieldLabelDirective,
  PeCouponsFormFieldSubscriptDirective,
  PeCouponsFormFieldSuffixDirective
]

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
    AuthModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    PeCouponsAutocompleteModule,
    PeCouponsCheckboxModule,
    PeCouponsDatepickerModule,
    // PeCouponsFormGroupModule,
    PeCouponsRadioModule,
    PeCouponsSelectModule,
    PeCouponsInputModule,
    PeCouponsListModule,
    PeCouponsSlideToggleModule,

    PeCouponsRouteModule,
    PeCouponsSharedModule,

    PebViewerModuleForRoot,
    PeDataGridModule,

    NgScrollbarModule,
  ],
  declarations: [
    ...icons,
    PeCouponsComponent,
    PeCouponsGridComponent,
    PeCouponsEditComponent,
    PeCouponsFormComponent,

    ...components,
    ...directives,
  ],
  providers: [
    PeOverlayService,
  ],
})
export class PeCouponsModule {}

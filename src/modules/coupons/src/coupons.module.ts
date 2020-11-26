import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { AuthModule } from '@pe/auth';
import { PebViewerModule } from '@pe/builder-viewer';
import { PeDataGridModule } from '@pe/data-grid';

import { NgScrollbarModule } from 'ngx-scrollbar';

import { PeCouponsRouteModule } from './coupons.routing';
import { PeCouponsSharedModule } from './coupons.shared';

import { PeCouponsIconAddComponent } from './misc/icons/add'
import { PeCouponsIconDateComponent } from './misc/icons/date';
import { PeCouponsIconMagentoComponent } from './misc/icons/magento';
import { PeCouponsIconPointOfSaleComponent } from './misc/icons/point-of-sale';
import { PeCouponsIconShopComponent } from './misc/icons/shop';
import { PeCouponsIconTimeComponent } from './misc/icons/time';

import { PeCouponsFormComponent } from './routes/form/coupons-form.component';
import { PeCouponsGridComponent } from './routes/grid/coupons-grid.component';
import { PeCouponsRootComponent } from './routes/root/coupons-root.component';

import { PeCouponsAutocompleteComponent } from './misc/components/coupons-autocomplete/coupons-autocomplete.component';
import { PeCouponsCheckboxComponent } from './misc/components/coupons-checkbox/coupons-checkbox.component';
import { PeCouponsExpansionPanelComponent } from './misc/components/coupons-expansion-panel/coupons-expansion-panel.component';
import { PeCouponsFormFieldComponent } from './misc/components/coupons-form-field/coupons-form-field.component';
import { PeCouponsFormGroupComponent } from './misc/components/coupons-form-group/coupons-form-group.component';
import { PeCouponsInputComponent } from './misc/components/coupons-input/coupons-input.component';
import { PeCouponsListItemComponent } from './misc/components/coupons-list/coupons-list-item.component';
import { PeCouponsListComponent } from './misc/components/coupons-list/coupons-list.component';
import { PeCouponsSelectComponent } from './misc/components/coupons-select/coupons-select.component';
import { PeCouponsSlideToggleComponent } from './misc/components/coupons-slide-toggle/coupons-slide-toggle.component';

import { PeCouponsExpansionPanelContentDirective } from './misc/components/coupons-expansion-panel/coupons-expansion-panel-content.directive';
import { PeCouponsFormFieldLabelDirective } from './misc/components/coupons-form-field/coupons-form-field-label.directive';
import { PeCouponsFormFieldPrefixDirective } from './misc/components/coupons-form-field/coupons-form-field-prefix.directive';
import { PeCouponsFormFieldSuffixDirective } from './misc/components/coupons-form-field/coupons-form-field-suffix.directive';
import { PeCouponsFormFieldSubscriptDirective } from './misc/components/coupons-form-field/coupons-form-field-subscript.directive';

import { PeOverlayService } from './misc/components/overlay/overlay.service';
import { PeCouponsDatepickerComponent } from './misc/components/coupons-datepicker/coupons-datepicker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { TextMaskModule } from 'angular2-text-mask';


// HACK: fix --prod build
// https://github.com/angular/angular/issues/23609
export const PebViewerModuleForRoot: any = PebViewerModule.forRoot();

const components = [
  PeCouponsAutocompleteComponent,
  PeCouponsCheckboxComponent,
  PeCouponsDatepickerComponent,
  PeCouponsExpansionPanelComponent,
  PeCouponsFormFieldComponent,
  PeCouponsFormGroupComponent,
  PeCouponsInputComponent,
  PeCouponsListComponent,
  PeCouponsListItemComponent,
  PeCouponsSelectComponent,
  PeCouponsSlideToggleComponent,
]

const directives = [
  PeCouponsExpansionPanelContentDirective,
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

    MatAutocompleteModule,
    MatDatepickerModule,
    MatDialogModule,
    MatMomentDateModule,
    MatSelectModule,

    PeCouponsRouteModule,
    PeCouponsSharedModule,

    PebViewerModuleForRoot,
    PeDataGridModule,

    NgScrollbarModule,
    TextMaskModule,
  ],
  declarations: [
    PeCouponsFormComponent,
    PeCouponsGridComponent,
    PeCouponsRootComponent,

    ...components,
    ...directives,
    ...icons,
  ],
  providers: [
    PeOverlayService,
  ],
})
export class PeCouponsModule {}

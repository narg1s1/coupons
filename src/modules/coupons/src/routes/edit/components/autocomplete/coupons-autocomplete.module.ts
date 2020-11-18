import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { PeCouponsAutocompleteComponent } from './coupons-autocomplete.component';


@NgModule({
  declarations: [ PeCouponsAutocompleteComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatAutocompleteModule
  ],
  exports: [ PeCouponsAutocompleteComponent ]
})
export class PeCouponsAutocompleteModule {}

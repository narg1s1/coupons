import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { PeCouponsDatepickerComponent } from './coupons-datepicker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';


@NgModule({
  declarations: [
    PeCouponsDatepickerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatDatepickerModule,
    MatMomentDateModule,
    MatDialogModule,

    TextMaskModule
  ],
  exports: [
    PeCouponsDatepickerComponent
  ],
})
export class PeCouponsDatepickerModule {}

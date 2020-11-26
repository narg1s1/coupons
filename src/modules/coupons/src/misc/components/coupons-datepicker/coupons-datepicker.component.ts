import { ChangeDetectionStrategy, Component, Inject, ViewChild } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Moment } from 'moment';
import * as moment_ from 'moment';
const moment = moment_;

@Component({
  selector: 'pe-coupons-datepicker',
  templateUrl: './coupons-datepicker.component.html',
  styleUrls: ['./coupons-datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeCouponsDatepickerComponent {

  @ViewChild('calendar') calendar: MatCalendar<Moment>

  readonly minDate = moment();

  constructor(
    private dialogRef: MatDialogRef<PeCouponsDatepickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  selectedChangeOn(date: Moment): void {
    this.dialogRef.close(date);
  }
}
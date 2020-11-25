import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { MatCalendar } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as moment from 'moment';
import { Moment } from 'moment';
import { ReplaySubject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';

function timeValidation(): ValidatorFn {
  return control => {
    const time = moment(control.value, 'hh:mm');
    return time.isValid() ? null : {timeFormat: true};
  }
}

@Component({
  selector: 'pe-coupons-datepicker',
  templateUrl: './coupons-datepicker.component.html',
  styleUrls: ['./coupons-datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeCouponsDatepickerComponent implements OnInit {

  readonly destroyed$ = new ReplaySubject<boolean>();

  @ViewChild('calendar') calendar: MatCalendar<Moment>

  selectedDate: Moment;
  readonly minDate = moment();
  readonly timeControl = new FormControl('', {
    validators: [timeValidation()],
    updateOn: 'blur',
  });
  readonly timeMask = [/\d/, /\d/, ':', /\d/, /\d/];
  a = '';

  constructor(
    private dialogRef: MatDialogRef<PeCouponsDatepickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    // if (this.data.schedule) {
    //   const schedule = this.data?.schedule;
    //   this.selectedChangeOn(schedule?.date ? moment(schedule.date) : moment());
    // }
    this.timeControl.valueChanges.pipe(
      takeUntil(this.destroyed$),
      filter(() => this.timeControl.valid),
      tap(time => {
        this.selectedDate = moment(`${this.selectedDate.format('YYYY-MM-DDT')}${time}:00`, 'YYYY-MM-DDThh:mm:ss');
      }),
    ).subscribe();
  }

  selectedChangeOn(date: Moment): void {
    this.selectedDate = date;
    this.timeControl.patchValue(date.format('hh:mm'));
  }

  applyOn(): void {
    if (this.timeControl.valid && this.data?.sendRequest) {
      this.data.sendRequest({
        date: this.selectedDate.format(),
      }).pipe(
        tap(() => this.dialogRef.close(true)),
        takeUntil(this.destroyed$),
      ).subscribe();
    }
  }
}
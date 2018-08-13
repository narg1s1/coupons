import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { DialogButtonListInterface, DialogComponentInterface, DialogRef } from '@pe/ng-kit/modules/dialog';

import { RootState } from '../../../../shared';
import { saveCoupon } from '../../../state-management/actions';
import { selectCouponLoading } from '../../../state-management/selectors';

@Component({
  templateUrl: 'duplicate-coupon.component.html'
})
export class ModalDuplicateCouponComponent implements DialogComponentInterface, OnInit {

  buttons: DialogButtonListInterface = {
    save: {
      classes: 'mat-button-bold',
      color: 'primary',
      text: 'Duplicate',
      order: 2,
      click: () => this.duplicateById()
    }
  };
  dialogRef: DialogRef<ModalDuplicateCouponComponent>;
  couponLoading$: Observable<boolean> = null;

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.couponLoading$ = this.store.select(selectCouponLoading);
  }

  duplicateById(): void {
    this.store.dispatch(saveCoupon());
    this.dialogRef.close();
  }

}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { DialogButtonListInterface, DialogComponentInterface, DialogRef } from '@pe/ng-kit/modules/dialog';

import { RootState } from '../../../../shared';
import { deleteCoupon } from '../../../state-management/actions';
import { selectCouponLoading } from "../../../state-management/selectors";

@Component({
  templateUrl: './remove-coupon.component.html'
})
export class ModalRemoveCouponComponent implements DialogComponentInterface, OnInit {
  buttons: DialogButtonListInterface = {
    save: {
      classes: 'mat-button-bold',
      color: 'primary',
      text: 'Remove',
      order: 2,
      click: () => this.removeById()
    }
  };
  dialogRef: DialogRef<ModalRemoveCouponComponent>;
  couponLoading$: Observable<boolean> = null;

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.couponLoading$ = this.store.select(selectCouponLoading);
  }

  removeById(): void {
    this.store.dispatch(deleteCoupon());
    this.dialogRef.close();
  }
}

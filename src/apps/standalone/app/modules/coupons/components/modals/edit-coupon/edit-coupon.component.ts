import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { DialogComponentInterface, DialogRef, DialogButtonListInterface } from '@pe/ng-kit/modules/dialog';

import { RootState } from '../../../../shared';
import { updateCoupon } from '../../../state-management/actions';
import { selectCouponLoading } from '../../../state-management/selectors';

@Component({
  templateUrl: 'edit-coupon.component.html'
})
export class ModalEditCouponComponent implements DialogComponentInterface, OnInit {
  buttons: DialogButtonListInterface = {
    save: {
      classes: 'mat-button-bold',
      color: 'primary',
      text: 'Done',
      order: 2,
      click: () => this.updateVoucher()
    }
  };
  dialogRef: DialogRef<ModalEditCouponComponent>;
  couponLoading$: Observable<boolean> = null;

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.couponLoading$ = this.store.select(selectCouponLoading);
  }

  private updateVoucher(): void {
    this.store.dispatch(updateCoupon());
    this.dialogRef.close();
  }
}

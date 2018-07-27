import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { DialogComponentInterface, DialogRef, DialogButtonListInterface, DIALOG_DATA } from '@pe/ng-kit/modules/dialog';

import { ApiService } from '../../service';
import { CouponState } from '../../state-management/interface';
import { updateCoupon } from '../../state-management/actions';
import { selectCouponLoading } from '../../state-management/selectors';

@Component({
  templateUrl: 'modal-edit-coupon.component.html'
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

  constructor(@Inject(DIALOG_DATA) public data: any,
              private apiService: ApiService,
              private store: Store<CouponState>) {
  }

  ngOnInit(): void {
    this.couponLoading$ = this.store.select(selectCouponLoading);
  }

  private updateVoucher(): void {
    this.store.dispatch(updateCoupon());
    this.dialogRef.close();
  }
}

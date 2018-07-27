import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { DIALOG_DATA, DialogButtonListInterface, DialogComponentInterface, DialogRef } from '@pe/ng-kit/modules/dialog';

import { ApiService } from '../../service';
import { CouponState } from '../../state-management/interface';
import { deleteCoupon } from '../../state-management/actions';
import { selectCouponLoading } from "../../state-management/selectors";

@Component({
  templateUrl: './modal-remove-coupon.component.html'
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

  constructor(@Inject(DIALOG_DATA) public data: any,
              private apiService: ApiService,
              private store: Store<CouponState>) {
  }

  ngOnInit(): void {
    this.couponLoading$ = this.store.select(selectCouponLoading);
  }

  removeById(): void {
    this.store.dispatch(deleteCoupon());
    this.dialogRef.close();
  }
}

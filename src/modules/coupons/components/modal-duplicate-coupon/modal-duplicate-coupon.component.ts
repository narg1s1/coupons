import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { DialogButtonListInterface, DialogComponentInterface, DialogRef, DIALOG_DATA } from '@pe/ng-kit/modules/dialog';

import { ApiService } from '../../service';
import { CouponState } from '../../state-management/interface';
import { saveCoupon } from '../../state-management/actions';
import { selectCouponLoading } from '../../state-management/selectors';

@Component({
  templateUrl: 'modal-duplicate-coupon.component.html'
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

  constructor(@Inject(DIALOG_DATA) public data: any,
              private apiService: ApiService,
              private store: Store<CouponState>) {
  }

  ngOnInit(): void {
    this.couponLoading$ = this.store.select(selectCouponLoading);
  }

  duplicateById(): void {
    this.store.dispatch(saveCoupon());
    this.dialogRef.close();
  }
}

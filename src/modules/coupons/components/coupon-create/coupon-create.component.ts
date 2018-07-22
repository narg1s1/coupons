import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { DialogComponentInterface, DialogRef, DialogButtonListInterface } from '@pe/ng-kit/modules/dialog';

import { CouponTabFormService, ApiService } from '../../service';
import { Coupon, VoucherTypeEnum, CouponCreateForm } from '../../interface';
import { CouponState } from '../../state-management/interface';
import { saveCoupon } from '../../state-management/actions';
import { selectCouponLoading } from '../../state-management/selectors';

@Component({
  templateUrl: 'coupon-create.component.html'
})
export class CouponCreateComponent implements DialogComponentInterface, OnInit {
  buttons: DialogButtonListInterface = {
    save: {
      classes: 'mat-button-bold',
      color: 'primary',
      text: 'Done',
      order: 2,
      click: () => this.couponTabFormService.setSubmittedForm(true)
    }
  };
  dialogRef: DialogRef<CouponCreateComponent>;
  couponLoading$: Observable<boolean> = null;

  constructor(private couponTabFormService: CouponTabFormService,
              private couponService: ApiService,
              private store: Store<CouponState>) {
  }

  ngOnInit(): void {
    this.couponLoading$ = this.store.select(selectCouponLoading);
  }

  setActiveForm(selectedTab: any): void {
    this.couponTabFormService.activeTabForm = selectedTab.index
  }

  onSubmitVoucherForm(data: CouponCreateForm): void {
    const requestData: Coupon = this.prepareFormData(data);
    this.store.dispatch(saveCoupon(requestData));
    this.dialogRef.close();
    this.couponTabFormService.setSubmittedForm(false);
  }

  onSubmitCampaignForm(data: any): void {
    this.couponTabFormService.setSubmittedForm(false);
    this.dialogRef.close();
  }

  private prepareFormData(form: CouponCreateForm): Coupon {
    const voucherTypeEntity = this.getVoucherTypeEntity(form);
    return {
      type: form.type,
      ...voucherTypeEntity,
      category: form.category,
      start_date: form.start_date,
      expiration_date: form.expiration_date,
    }
  }

  private getVoucherTypeEntity(form: CouponCreateForm): any {
    let entity;
    if (form.type === VoucherTypeEnum.DISCOUNT_VOUCHER_TYPE) {
      entity = {
        discount: {
          type: form.discount_type,
          amount: form.amount_off,
          percent: form.percent_off,
          unit: form.unit_off
        },
        gift: {}
      }
    } else {
      entity = {
        gift: { amount: form.gift_amount },
        discount: {}
      }
    }
    return entity;
  }
}

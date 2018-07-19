import { Component } from '@angular/core';

import { DialogComponentInterface, DialogRef, DialogButtonListInterface } from '@pe/ng-kit/modules/dialog';

import { CouponTabFormService, ApiService, SpinnerService, VoucherStorageService } from '../../service';
import { Coupon, VoucherTypeEnum, CouponCreateForm } from '../../interface';

@Component({
  templateUrl: 'coupon-create.component.html'
})
export class CouponCreateComponent implements DialogComponentInterface {
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

  constructor(private couponTabFormService: CouponTabFormService,
              private couponService: ApiService,
              private voucherStorageService: VoucherStorageService,
              protected spinnerService: SpinnerService) {
  }

  setActiveForm(selectedTab: any): void {
    this.couponTabFormService.activeTabForm = selectedTab.index
  }

  onSubmitVoucherForm(data: CouponCreateForm): void {
    const requestData: Coupon = this.prepareFormData(data);
    this.spinnerService.start();
    this.couponService.createVoucher(requestData).subscribe(
      (coupon) => {
        this.voucherStorageService.updateStorage([...this.voucherStorageService.voucherList, coupon]);
        this.spinnerService.stop();
        this.dialogRef.close();
      },
      (error) => {
        this.spinnerService.stop();
      }
    );
    this.couponTabFormService.setSubmittedForm(false);
  }

  onSubmitCampaignForm(data: any): void {
    this.spinnerService.start();
    this.couponService.createVoucher(data.data).subscribe(
      (response) => {
        this.spinnerService.stop();
        this.dialogRef.close();
      },
      (error) => {
        this.spinnerService.stop();
      }
    );
    this.couponTabFormService.setSubmittedForm(false);
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

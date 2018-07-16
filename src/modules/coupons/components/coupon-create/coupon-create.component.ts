import { Component } from '@angular/core';

import { DialogComponentInterface, DialogRef, DialogButtonListInterface } from '@pe/ng-kit/modules/dialog';

import { CouponTabFormService, ApiService } from '../../service';

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
              private couponService: ApiService) {
  }

  setActiveForm(selectedTab: any): void {
    this.couponTabFormService.activeTabForm = selectedTab.index
  }

  onSubmitVoucherForm(data: any): void {
    this.couponService.createVoucher(data.data);
    this.couponTabFormService.setSubmittedForm(false);
    this.dialogRef.close();
  }

  onSubmitCampaignForm(data: any): void {
    this.couponService.createVoucher(data.data);
    this.couponTabFormService.setSubmittedForm(false);
    this.dialogRef.close();
  }
}

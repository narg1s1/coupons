import { Component, Inject } from '@angular/core';

import { DIALOG_DATA, DialogButtonListInterface, DialogComponentInterface, DialogRef } from '@pe/ng-kit/modules/dialog';

import { ApiService, SpinnerService, VoucherStorageService } from '../../service';

@Component({
  templateUrl: './coupon-remove.component.html'
})
export class CouponRemoveComponent implements DialogComponentInterface {
  buttons: DialogButtonListInterface = {
    save: {
      classes: 'mat-button-bold',
      color: 'primary',
      text: 'Remove',
      order: 2,
      click: () => this.removeById()

    }
  };
  dialogRef: DialogRef<CouponRemoveComponent>;

  constructor(@Inject(DIALOG_DATA) public data: any,
              private apiService: ApiService,
              private voucherStorageService: VoucherStorageService,
              protected spinnerService: SpinnerService) {
  }

  removeById(): void {
    this.spinnerService.start();
    const updatedVoucherList = this.voucherStorageService.voucherList
      .filter(coupon => coupon.uuid !== this.data.uuid);
    this.apiService.deleteVoucher(this.data.uuid).subscribe(
      (coupon) => {
        this.voucherStorageService.updateStorage(updatedVoucherList);
        this.spinnerService.stop();
        this.dialogRef.close();
      },
      (error) => {
        this.spinnerService.stop();
      }
    );
  }
}

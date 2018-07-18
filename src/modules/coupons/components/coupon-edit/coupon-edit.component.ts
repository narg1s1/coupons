import {Component, Inject} from '@angular/core';

import { DialogComponentInterface, DialogRef, DialogButtonListInterface, DIALOG_DATA } from '@pe/ng-kit/modules/dialog';

import {ApiService, SpinnerService, VoucherStorageService} from '../../service';

@Component({
  templateUrl: 'coupon-edit.component.html'
})
export class CouponEditComponent implements DialogComponentInterface {
  buttons: DialogButtonListInterface = {
    save: {
      classes: 'mat-button-bold',
      color: 'primary',
      text: 'Done',
      order: 2,
      click: () => this.updateVoucher()
    }
  };
  dialogRef: DialogRef<CouponEditComponent>;

  constructor(@Inject(DIALOG_DATA) public data: any,
              private apiService: ApiService,
              private voucherStorageService: VoucherStorageService,
              protected spinnerService: SpinnerService) {
  }

  private updateVoucher(): void {
    this.spinnerService.start();
    this.apiService.updateVoucher(this.data.coupon).subscribe(
      (coupon) => {
        this.voucherStorageService.updateStorage([...this.voucherStorageService.voucherList, coupon]);
        this.spinnerService.stop();
        this.dialogRef.close();
      },
      (error) => {
        this.spinnerService.start();
      }
    );
  }
}

import {Component, Inject} from '@angular/core';

import { DialogButtonListInterface, DialogComponentInterface, DialogRef, DIALOG_DATA } from '@pe/ng-kit/modules/dialog';

import { ApiService, SpinnerService, VoucherStorageService } from '../../service';

@Component({
  templateUrl: 'coupon-duplicate.component.html'
})
export class CouponDuplicateComponent implements DialogComponentInterface {
  buttons: DialogButtonListInterface = {
    save: {
      classes: 'mat-button-bold',
      color: 'primary',
      text: 'Duplicate',
      order: 2,
      click: () => this.duplicateById()
    }
  };
  dialogRef: DialogRef<CouponDuplicateComponent>;

  constructor(@Inject(DIALOG_DATA) public data: any,
              protected voucherStorageService: VoucherStorageService,
              private apiService: ApiService,
              protected spinnerService: SpinnerService) {
  }

  duplicateById(): void {
    this.apiService.createVoucher(this.data.coupon).subscribe(
      (coupon) => {
        this.voucherStorageService.updateStorage([...this.voucherStorageService.voucherList, coupon]);
        this.spinnerService.stop();
        this.dialogRef.close()
      },
      (error) => {
        this.spinnerService.stop();
      }
    )
  }
}

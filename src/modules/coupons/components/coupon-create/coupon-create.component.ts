import { Component } from '@angular/core';

import { DialogComponentInterface, DialogRef, DialogButtonListInterface } from '@pe/ng-kit/modules/dialog';

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
      click: () => this.dialogRef.close('done')
    }
  };
  dialogRef: DialogRef<CouponCreateComponent>;
}

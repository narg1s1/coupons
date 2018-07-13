import {Component, Inject} from '@angular/core';

import { DialogComponentInterface, DialogRef, DialogButtonListInterface, DIALOG_DATA } from '@pe/ng-kit/modules/dialog';

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
      click: () => {
        this.dialogRef.close();
      }
    }
  };
  dialogRef: DialogRef<CouponEditComponent>;

  constructor(@Inject(DIALOG_DATA) public data: any) {
  }
}

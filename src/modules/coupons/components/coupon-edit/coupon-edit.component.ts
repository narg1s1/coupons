import { Component } from '@angular/core';

import { DialogComponentInterface, DialogRef, DialogButtonListInterface } from '@pe/ng-kit/modules/dialog';

@Component({
  templateUrl: 'coupon-edit.component.html'
})
export class CouponEditComponent implements DialogComponentInterface {
  buttons: DialogButtonListInterface = {
    save: {
      classes: 'mat-button-bold',
      color: 'primary',
      text: 'Try again',
      order: 2,
      click: () => {
        alert('"Try again" was clicked');
        this.dialogRef.close();
      }
    }
  };
  dialogRef: DialogRef<CouponEditComponent>;
}

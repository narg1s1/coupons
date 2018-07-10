import { Component } from '@angular/core';

import { DialogButtonListInterface, DialogComponentInterface, DialogRef } from '@pe/ng-kit/modules/dialog';

@Component({
  templateUrl: 'coupon-duplicate.component.html'
})
export class CouponDuplicateComponent implements DialogComponentInterface {
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
  dialogRef: DialogRef<CouponDuplicateComponent>;
}

import {Component, Inject} from '@angular/core';

import { DialogButtonListInterface, DialogComponentInterface, DialogRef, DIALOG_DATA } from '@pe/ng-kit/modules/dialog';

import { MockData } from '../../service/mock-data';

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
      click: () => {
        this.duplicateById();
        this.dialogRef.close();
      }
    }
  };
  dialogRef: DialogRef<CouponDuplicateComponent>;

  constructor(@Inject(DIALOG_DATA) public data: any, protected mockData: MockData) {
  }

  duplicateById() {
    const newData = this.mockData.active.find((item) => item.code === this.data.item.code);
    this.mockData.save([...this.mockData.active, newData]);
  }
}

import {Component, Inject} from '@angular/core';

import { DIALOG_DATA, DialogButtonListInterface, DialogComponentInterface, DialogRef} from '@pe/ng-kit/modules/dialog';
import { MockData } from '../../service/mock-data';

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
      click: () => {
        this.removeById();
        this.dialogRef.close();
      }
    }
  };
  dialogRef: DialogRef<CouponRemoveComponent>;

  constructor(@Inject(DIALOG_DATA) public data: any, protected mockData: MockData) {
  }

  removeById() {
    const data = this.mockData.active.slice();
    data.splice(0, 1);
    this.mockData.save(data);
  }
}

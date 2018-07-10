import { Component } from '@angular/core';

import { DialogConfigPresetName, DialogService } from '@pe/ng-kit/modules/dialog';

import { CouponCreateComponent } from '../coupon-create';

@Component({
  selector: 'coupons-layout',
  templateUrl: 'coupon-layout.component.html',
  styleUrls: ['coupon-layout.component.scss']
})
export class CouponLayoutComponent {
  constructor(private dialogService: DialogService) {
  }

  onOpenCreateCouponDialog(): void {
    this.dialogService.open(
      CouponCreateComponent,
      DialogConfigPresetName.Small
    );
  }
}

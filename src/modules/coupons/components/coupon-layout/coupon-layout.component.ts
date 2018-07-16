import { Component } from '@angular/core';

import { DialogConfigPresetName, DialogRef, DialogService } from '@pe/ng-kit/modules/dialog';

import { CouponCreateComponent } from '../coupon-create';
import { CouponTabFormService, TypeFormEnum } from '../../service';

@Component({
  selector: 'coupons-layout',
  templateUrl: 'coupon-layout.component.html',
  styleUrls: ['coupon-layout.component.scss']
})
export class CouponLayoutComponent {
  constructor(private dialogService: DialogService,
              private couponTabFormService: CouponTabFormService) {
  }

  onOpenCreateCouponDialog(): void {
    const dialogRef: DialogRef<CouponCreateComponent> = this.dialogService.open(
      CouponCreateComponent,
      DialogConfigPresetName.Medium,
    );
    dialogRef.afterClosed().subscribe(() => {
      this.couponTabFormService.activeTabForm = TypeFormEnum.VOUCHER;
    });
  }
}

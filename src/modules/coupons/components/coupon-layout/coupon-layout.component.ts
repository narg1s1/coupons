import { Component } from '@angular/core';

import { DialogConfigPresetName, DialogRef, DialogService } from '@pe/ng-kit/modules/dialog';

import { ModalCreateCouponComponent } from '../modal-create-coupon';
import { CouponFormService } from '../../service';
import { TypeFormEnum } from '../../interface';

@Component({
  selector: 'coupons-layout',
  templateUrl: 'coupon-layout.component.html',
  styleUrls: ['coupon-layout.component.scss']
})
export class CouponLayoutComponent {
  constructor(private dialogService: DialogService,
              private couponTabFormService: CouponFormService) {}

  onOpenCreateCouponDialog(): void {
    const dialogRef: DialogRef<ModalCreateCouponComponent> = this.dialogService.open(
      ModalCreateCouponComponent,
      DialogConfigPresetName.Medium,
    );
    dialogRef.afterClosed().subscribe(() => {
      this.couponTabFormService.activeTabForm = TypeFormEnum.VOUCHER;
    });
  }
}

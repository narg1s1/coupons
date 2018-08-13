import { Component } from '@angular/core';

import { DialogConfigPresetName, DialogRef, DialogService } from '@pe/ng-kit/modules/dialog';

import { ModalCreateCouponComponent } from '../modals';
import { CouponFormService } from '../../service';
import { TypeFormEnum } from '../../../shared';

@Component({
  selector: 'coupons-layout',
  templateUrl: 'layout.component.html'
})
export class CouponsLayoutComponent {

  constructor(
    private dialogService: DialogService,
    private couponTabFormService: CouponFormService
  ) {}

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

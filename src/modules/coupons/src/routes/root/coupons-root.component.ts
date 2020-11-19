import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pe-coupons',
  templateUrl: './coupons-root.component.html',
  styleUrls: ['./coupons-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeCouponsComponent {}

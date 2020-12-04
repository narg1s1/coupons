import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pe-coupons',
  templateUrl: './coupons-root.component.html',
  styleUrls: ['./coupons-root.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeCouponsRootComponent {}

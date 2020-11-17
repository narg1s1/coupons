import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';


@Component({
  selector: 'pe-coupons-edit',
  templateUrl: './coupons-edit.component.html',
  styleUrls: ['./coupons-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeCouponsEditComponent implements OnInit {

  types = [
    { key: 'Percentage', value: 'percentage' },
    { key: 'Fixed amount', value: 'fixed-amount' },
    { key: 'Free shipping', value: 'free-shipping' },
    { key: 'Buy X get Y', value: 'buy-x-get-y' },
  ]

  constructor() {}

  ngOnInit() {

  }
}
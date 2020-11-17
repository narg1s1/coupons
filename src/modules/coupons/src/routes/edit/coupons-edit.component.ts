import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';


@Component({
  selector: 'pe-coupons-edit',
  templateUrl: './coupons-edit.component.html',
  styleUrls: ['./coupons-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeCouponsEditComponent implements OnInit {

  types = [
    { label: 'Percentage', value: 'percentage' },
    { label: 'Fixed amount', value: 'fixed-amount' },
    { label: 'Free shipping', value: 'free-shipping' },
    { label: 'Buy X get Y', value: 'buy-x-get-y' },
  ]

  appliesTo = [
    { label: 'All products', value: 'all-products' },
    { label: 'Fixed amount', value: 'specific-collections' },
    { label: 'Specific products', value: 'specific-products' },
  ]

  constructor() {}

  ngOnInit() {

  }
}
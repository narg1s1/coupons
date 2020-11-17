import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


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
    { label: 'Buy X get Y', value: 'buy-x-get-y' }
  ];

  appliesTo = [
    { label: 'All products', value: 'all-products' },
    { label: 'Specific collections', value: 'specific-collections' },
    { label: 'Specific products', value: 'specific-products' }
  ];

  minimumRequirements = [
    { label: 'None', value: null },
    { label: 'Minimum purchase amount ($)', value: 'minimum-purchase-amount' },
    { label: 'Minimum quantity of items', value: 'minimum-quantity-of-items' }
  ];

  customerEligibility = [
    { label: 'Everyone', value: 'everyone' },
    { label: 'Specific groups of customers', value: 'specific-groups-of-customers' },
    { label: 'Specific customers', value: 'specific-customers' }
  ];

  couponForm = this.formBuilder.group({
    discountCode: [],
    type: ['percentage'],
    discountValue: [],
    // countries
    excludeShippingRates: [false],
    shippingRatesValue: [],
    appliesTo: ['all-products'],
    // collections
    // products
    minimumRequirements: [null],
    minimumPurchaseAmout: [],
    minimumQuantityOfItems: [],
    customerEligibility: ['everyone'],
    // groupsOfCustomers
    // customers
    limitNumberOfTimes: [false],
    limitToOneUse: [false],
    limitNumberOfTimesValue: [],
    startDate: [],
    startTime: [],
    setEndDate: [false],
    endDate: [],
    endTime: []
  });

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.couponForm.valueChanges.subscribe(change => console.log(change));

    this.couponForm.get('type').valueChanges.subscribe(() => {
      this.couponForm.get('discountValue').patchValue(null, { emitEvent: false });
    });
  }
}
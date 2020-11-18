import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { LocaleConstantsService } from '@pe/i18n';


@Component({
  selector: 'pe-coupons-edit',
  templateUrl: './coupons-edit.component.html',
  styleUrls: ['./coupons-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeCouponsEditComponent implements OnInit {

  countries = [];

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

  couponForm: FormGroup = this.formBuilder.group({
    discountCode: [],
    type: ['free-shipping'],
    discountValue: [],
    countries: [[]],
    excludeShippingRates: [false],
    shippingRatesValue: [],
    appliesTo: ['all-products'],
    // collections: [[]],
    // products: [[]],
    minimumRequirements: [null],
    minimumPurchaseAmout: [],
    minimumQuantityOfItems: [],
    customerEligibility: ['everyone'],
    // groupsOfCustomers: [[]],
    // customers: [[]],
    limitNumberOfTimes: [false],
    limitToOneUse: [false],
    limitNumberOfTimesValue: [],
    startDate: [],
    startTime: [],
    setEndDate: [false],
    endDate: [],
    endTime: []
  });

  constructor(
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private localConstantsService: LocaleConstantsService
  ) {
  }

  ngOnInit(): void {
    this.couponForm.valueChanges.subscribe(change => console.log(change));

    this.couponForm.get('type').valueChanges.subscribe(() => {
      this.couponForm.get('discountValue').patchValue(null, { emitEvent: false });
    });

    this.setCountries();
  }

  setCountries() {
    const countryList = this.localConstantsService.getCountryList();

    Object.keys(countryList).map(countryKey => {
      const countryValue = countryList[countryKey];

      this.countries.push({
        key: countryKey,
        value: Array.isArray(countryValue) ? countryValue[0] : countryValue
      });
    })
  }

  addToArray(value: string, array: any): void {
    array.push(value);
  }

  removeFromArray(array: any, index: number): void {
    array.splice(index, 1);
  }

}
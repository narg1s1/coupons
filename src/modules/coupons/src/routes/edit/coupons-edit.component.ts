import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { LocaleConstantsService } from '@pe/i18n';
import { ReplaySubject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { PeCoupon } from '../../misc/interfaces/coupon.model';
import { PeCouponsApi } from '../../services/abstract.coupons.api';


@Component({
  selector: 'pe-coupons-edit',
  templateUrl: './coupons-edit.component.html',
  styleUrls: ['./coupons-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeCouponsEditComponent implements OnInit {

  readonly destroyed$ = new ReplaySubject<boolean>();

  coupon: PeCoupon;

  countries = [];
  products = [];
  collections = [];

  types = [
    { label: 'Percentage', value: 'PERCENTAGE' },
    { label: 'Fixed amount', value: 'FIXED_AMOUNT' },
    { label: 'Free shipping', value: 'FREE_SHIPPING' },
    { label: 'Buy X get Y', value: 'BUY_X_GET_Y' }
  ];

  appliesTo = [
    { label: 'All products', value: 'ALL_PRODUCTS' },
    { label: 'Specific collections', value: 'SPECIFIC_COLLECTIONS' },
    { label: 'Specific products', value: 'SPECIFIC_PRODUCTS' }
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
    appliesToProducts: [[]],
    appliesToCollections: [[]],
    // businessId: [],
    // channelSetsIds: [],
    code: [],
    // contacts: [],
    // createdAt: [],
    сustomerEligibilityCustomerGroups: [[]],
    customerEligibilitySpecificCustomers: [[]],
    // description: [],
    endDate: [],
    // isAutomaticDiscount: [],
    limits: this.formBuilder.group({
      limitOneCustomer: [],
      limitUsage: [],
      limitUsageAmount: [],
    }),
    // name: [],
    // products: [],
    startDate: [],
    // status: [],
    type: this.formBuilder.group({
      appliesTo: [], // need remove
      // appliesToCollections: [[]],
      // appliesToProducts: [[]],
      discountValue: [],
      type: [],
    }),
    // updateAt: [],

    setEndDate: [],

    // countries: [[]],
    // excludeShippingRates: [],
    // shippingRatesValue: [],
    // minimumRequirements: [],
    // minimumPurchaseAmout: [],
    // minimumQuantityOfItems: [],
    // customerEligibility: [],
    // // groupsOfCustomers: [[]],
    // // customers: [[]],
    
  });

  constructor(
    private apiService: PeCouponsApi,
    private formBuilder: FormBuilder,
    private localConstantsService: LocaleConstantsService,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    const couponId = this.activatedRoute.snapshot.params.couponId;

    this.apiService.getCouponById(couponId).subscribe(coupon => console.log(coupon));

    this.apiService.getCouponById(couponId).pipe(
      tap((coupon: PeCoupon) => {
        this.coupon = coupon;
        this.couponForm.patchValue(coupon);
        this.couponForm.controls.setEndDate.patchValue(coupon.endDate ? true : false)
        this.changeDetectorRef.markForCheck();
      }),
      takeUntil(this.destroyed$),
    ).subscribe();

    this.couponForm.valueChanges.subscribe(change => console.log(change));

    // this.couponForm.get('type').valueChanges.subscribe(() => {
    //   this.couponForm.get('discountValue').patchValue(null, { emitEvent: false });
    // });

    this.getCountries();
    this.getProducts();
    this.getCollections();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  getCountries() {
    const countryList = this.localConstantsService.getCountryList();

    Object.keys(countryList).map(countryKey => {
      this.countries.push({
        key: countryKey,
        value: Array.isArray(countryList[countryKey]) ? countryList[countryKey][0] : countryList[countryKey]
      });
    })
  }

  getProducts() {
    this.apiService.getProducts().pipe(
      map(request => request.data.getProducts.products.filter(product => !!product)),
      tap(products => this.products = products),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  getCollections() {
    this.apiService.getCategories().pipe(
      map(request => request.data.getCategories.filter(collection => !!collection)),
      tap(collections => {
        console.log(collections);
        return this.collections = collections
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  addToArray(value: string, array: any): void {
    console.log(value, array);
    array.push(value);
  }

  removeFromArray(array: any, index: number): void {
    array.splice(index, 1);
  }

}
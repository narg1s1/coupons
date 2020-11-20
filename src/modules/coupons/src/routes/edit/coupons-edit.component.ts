import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocaleConstantsService } from '@pe/i18n';
import { ReplaySubject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { 
  PeCoupon, 
  PeCouponTypeAppliedToEnum, 
  PeCouponTypeBuyXGetYBuyRequirementsTypeEnum, 
  PeCouponTypeBuyXGetYGetDiscountTypesEnum, 
  PeCouponTypeBuyXGetYItemTypeEnum, 
  PeCouponTypeCustomerEligibilityEnum, 
  PeCouponTypeEnum, 
  PeCouponTypeFreeShippingTypeEnum, 
  PeCouponTypeMinimumRequirementsEnum,
} from '../../misc/interfaces/coupon.model';
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
    { label: 'Percentage', value: PeCouponTypeEnum.Percentage },
    { label: 'Fixed amount', value: PeCouponTypeEnum.FixedAmount },
    { label: 'Free shipping', value: PeCouponTypeEnum.FreeShipping },
    { label: 'Buy X get Y', value: PeCouponTypeEnum.BuyXGetY }
  ];

  freeShippingType = [
    { label: 'All countries', value: PeCouponTypeFreeShippingTypeEnum.AllCountries },
    { label: 'Selected countries', value: PeCouponTypeFreeShippingTypeEnum.SelectedCountries },
  ];

  atADiscountedValue = [
    { label: 'Percentage', value: PeCouponTypeBuyXGetYGetDiscountTypesEnum.Percentage },
    { label: 'Free', value: PeCouponTypeBuyXGetYGetDiscountTypesEnum.Free },
  ]

  buyRequirementType = [
    { label: 'Minimum quantity of items', value: PeCouponTypeBuyXGetYBuyRequirementsTypeEnum.MinimumQuantityOfItems },
    { label: 'Minimum purchase amount', value: PeCouponTypeBuyXGetYBuyRequirementsTypeEnum.MinimumPurchaseAmount },
  ]

  buyOrGetType = [
    { label: 'Specific collections', value: PeCouponTypeBuyXGetYItemTypeEnum.SpecificCollections },
    { label: 'Specific products', value: PeCouponTypeBuyXGetYItemTypeEnum.SpecificProducts }
  ]

  appliesTo = [
    { label: 'All products', value: PeCouponTypeAppliedToEnum.AllPpoducts },
    { label: 'Specific collections', value: PeCouponTypeAppliedToEnum.SpecificCollections },
    { label: 'Specific products', value: PeCouponTypeAppliedToEnum.SpecificProducts }
  ];

  minimumRequirements = [
    { label: 'None', value: PeCouponTypeMinimumRequirementsEnum.None },
    { label: 'Minimum purchase amount ($)', value: PeCouponTypeMinimumRequirementsEnum.MinimumPurchaseAmount },
    { label: 'Minimum quantity of items', value: PeCouponTypeMinimumRequirementsEnum.MinimumQuantityOfItems }
  ];

  customerEligibility = [
    { label: 'Everyone', value: PeCouponTypeCustomerEligibilityEnum.Everyone },
    { label: 'Specific groups of customers', value: PeCouponTypeCustomerEligibilityEnum.SpecificGroupsOfCustomers },
    { label: 'Specific customers', value: PeCouponTypeCustomerEligibilityEnum.SpecificCustomers }
  ];

  couponForm: FormGroup = this.formBuilder.group({
    appliesTo: [],
    appliesToProducts: [[]],
    appliesToCollections: [[]],
    // businessId: [],
    // channelSetsIds: [],
    code: [],
    // contacts: [],
    // createdAt: [],
    minimumRequirements: [],
    minimumRequirementsValue: [],
    customerEligibility: [],
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
      type: [],
      discountValue: [],
      // appliesToCollections: [[]], //
      // appliesToProducts: [[]], //
      freeShippingType: [],
      freeShippingToCountries: [[]],
      buyRequirementType: [],
      buyValue: [],
      buyType: [],
      buyItems: [[]],
      getType: [],
      getItems: [[]],
      getQuantity: [],
      getDiscountType: [],
    }),
    // updateAt: [],

    setEndDate: [],    
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

    this.apiService.getCouponById(couponId).pipe(
      tap((coupon: PeCoupon) => {
        this.coupon = coupon;
        this.couponForm.patchValue(coupon);
        console.log(coupon);
        this.couponForm.controls.setEndDate.patchValue(coupon.endDate ? true : false)
        this.changeDetectorRef.markForCheck();
      }),
      takeUntil(this.destroyed$),
    ).subscribe();

    this.couponForm.valueChanges.subscribe(change => console.log(change));

    // this.couponForm.get('type').valueChanges.subscribe(() => {
    //   this.couponForm.get('discountValue').patchValue(null, { emitEvent: false });
    // });

    this.getChannel();
    this.getCollections();
    this.getContacts();
    this.getCountries();
    this.getProducts();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  getChannel() {
    this.apiService.getChannel().pipe(
      tap(channel => console.log(channel)),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  getCountries() {
    const countryList = this.localConstantsService.getCountryList();

    Object.keys(countryList).map(countryKey => {
      this.countries.push({
        id: countryKey,
        title: Array.isArray(countryList[countryKey]) ? countryList[countryKey][0] : countryList[countryKey]
      });
    })
  }

  getCountry(countryId: string) {
    return this.countries.find(country => country.id === countryId);
  }

  getContacts() {
    this.apiService.getContacts().pipe(
      // map(request => request.data.getProducts.products.filter(product => !!product)),
      tap(contacts => console.log(contacts)),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  getProducts() {
    this.apiService.getProducts().pipe(
      map(request => request.data.getProducts.products.filter(product => !!product)),
      tap(products => this.products = products),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  getProduct(productId: string) {
    console.log(productId);
    return this.products.find(product => product._id === productId);
  }

  getCollections() {
    this.apiService.getCategories().pipe(
      map(request => request.data.getCategories.filter(collection => !!collection)),
      tap(collections => this.collections = collections),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  getCollection(collectionId: string) {
    console.log(collectionId);
    return this.collections.find(collection => collection.id === collectionId);
  }

  addToArray(element: any, array: any): void {
    const elementId = element?.id || element?._id;

    if (!array.some(element => element.id === elementId || element._id === elementId)) {
      array.push(elementId);
    };
  }

  removeFromArray(array: any, index: number): void {
    array.splice(index, 1);
  }

}
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
  customers = [];
  groupsOfCustomers = [];
  channels = [];

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
    appliesTo: [PeCouponTypeAppliedToEnum.AllPpoducts],
    appliesToProducts: [[]],
    appliesToCollections: [[]],
    code: [],
    minimumRequirements: [PeCouponTypeMinimumRequirementsEnum.None],
    minimumRequirementsValue: [],
    customerEligibility: [PeCouponTypeCustomerEligibilityEnum.Everyone],
    customerEligibilityCustomerGroups: [[]],
    customerEligibilitySpecificCustomers: [[]],
    endDate: [],
    limits: this.formBuilder.group({
      limitOneCustomer: [],
      limitUsage: [],
      limitUsageAmount: [],
    }),
    startDate: [],
    type: this.formBuilder.group({
      type: [PeCouponTypeEnum.Percentage],
      discountValue: [],
      freeShippingType: [],
      freeShippingToCountries: [[]],
      buyRequirementType: [],
      buyValue: [],
      buyType: [PeCouponTypeBuyXGetYItemTypeEnum.SpecificCollections],
      buyItems: [[]],
      getType: [PeCouponTypeBuyXGetYItemTypeEnum.SpecificCollections],
      getItems: [[]],
      getQuantity: [],
      getDiscountType: [],
    }),
    setEndDate: [],    
  });

  startDatePlaceholder = new Date();
  endDatePlaceholder = new Date();

  constructor(
    private apiService: PeCouponsApi,
    private formBuilder: FormBuilder,
    private localConstantsService: LocaleConstantsService,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.endDatePlaceholder.setDate(this.startDatePlaceholder.getDate() + 1);
  }

  ngOnInit(): void {   
    const couponId = this.activatedRoute.snapshot.params.couponId;

    if (couponId !== 'add') this.getCoupon(couponId);

    this.couponForm.valueChanges.subscribe(changes => console.log(changes));

    this.getChannel();
    this.getCollections();
    this.getContactGroups();
    this.getContacts();
    this.getCountries();
    this.getProducts();

    this.formChanges();
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

  getCoupon(couponId: string) {
    this.apiService.getCouponById(couponId).pipe(
      tap((coupon: PeCoupon) => {
        this.coupon = coupon;
        this.couponForm.patchValue(coupon);
        this.couponForm.get('setEndDate').patchValue(coupon.endDate ? true : false);
        this.changeDetectorRef.markForCheck();
      }),
      takeUntil(this.destroyed$),
    ).subscribe();
  }

  getContactGroups() {
    this.apiService.getContactGroups().pipe(
      map(request => request.data.groups.nodes.map(group => {
        return { id: group.id, title: group.name } 
      })),
      tap(groupsOfCustomers => this.groupsOfCustomers = groupsOfCustomers),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  getContacts() {
    this.apiService.getContacts().pipe(
      map(request => {
        return request.data.contacts.nodes.map(contact => {
          const customer = { id: contact.id, title: null };
          contact.contactFields.nodes.map(node => customer[node.field.name] = node.value);
          customer.title = customer['email'] ?? customer['mobilePhone'];
          return customer;
        })
      }),
      tap(customers => this.customers = customers),
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

  getCollections() {
    this.apiService.getCategories().pipe(
      map(request => request.data.getCategories.filter(collection => !!collection)),
      tap(collections => this.collections = collections),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  formChanges() {
    const type = this.couponForm.get('type');

    type.get('buyType').valueChanges.pipe(
      tap(changes => {
        if (changes != type.value.buyType) type.get('buyItems').patchValue([], { emitEvent: false });
      }),
      takeUntil(this.destroyed$)
    ).subscribe();

    type.get('getType').valueChanges.pipe(
      tap(changes => {
        if (changes != type.value.getType) type.get('getItems').patchValue([], { emitEvent: false });
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  addToArray(element: any, array: any): void {
    const elementId = element?.id ?? element?._id;

    if (!array.some(element => element === elementId || element === elementId)) {
      array.push(elementId);
    };
  }

  getFromArray(array: any, id: string) {
    return array.find(element => element.id === id || element._id === id);
  }

  removeFromArray(array: any, index: number): void {
    array.splice(index, 1);
  }

}
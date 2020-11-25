import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PebEnvService } from '@pe/builder-core';
import { LocaleConstantsService } from '@pe/i18n';
import { of, ReplaySubject } from 'rxjs';
import { catchError, map, takeUntil, tap } from 'rxjs/operators';
import { PeCouponsDatepickerComponent } from '../../misc/components/datepicker/coupons-datepicker.component';

import { 
  PeCoupon, 
  PeCouponsStatusEnum, 
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
  products;
  collections;
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
    { label: 'Specific collections', value: PeCouponTypeBuyXGetYItemTypeEnum.SpecificCategories },
    { label: 'Specific products', value: PeCouponTypeBuyXGetYItemTypeEnum.SpecificProducts }
  ]

  appliesTo = [
    { label: 'All products', value: PeCouponTypeAppliedToEnum.AllPpoducts },
    { label: 'Specific collections', value: PeCouponTypeAppliedToEnum.SpecificCategories },
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
    businessId: [this.pebEnvService.businessId],
    code: [null], // required
    channelSetsId: [[]],
    description: ['description'], // required
    customerEligibility: [PeCouponTypeCustomerEligibilityEnum.Everyone],
    customerEligibilityCustomerGroups: [[]],
    customerEligibilitySpecificCustomers: [[]],
    setEndDate: [], // remove before submit
    endDate: [null],
    limits: this.formBuilder.group({
      limitOneUsePerCustomer: [],
      limitUsage: [],
      limitUsageAmount: [],
    }),
    name: ['name'], // required
    startDate: [],
    type: this.formBuilder.group({
      type: [PeCouponTypeEnum.Percentage],
      appliesTo: [PeCouponTypeAppliedToEnum.AllPpoducts],
      appliesToProducts: [[]],
      appliesToCategories: [[]],
      minimumRequirements: [PeCouponTypeMinimumRequirementsEnum.None],
      minimumRequirementsValue: [],
      excludeShippingRatesOverCertainAmount: [false],
      excludeShippingRatesOverCertainAmountValue: [],
      freeShippingType: [PeCouponTypeFreeShippingTypeEnum.AllCountries],
      freeShippingToCountries: [[]],
      buyRequirementType: [PeCouponTypeBuyXGetYBuyRequirementsTypeEnum.MinimumQuantityOfItems],
      buyQuantity: [],
      buyType: [PeCouponTypeBuyXGetYItemTypeEnum.SpecificCategories],
      buyProducts: [[]],
      buyCollections: [[]],
      getType: [PeCouponTypeBuyXGetYItemTypeEnum.SpecificCategories],
      getQuantity: [],
      getProducts: [[]],
      getCollections: [[]],
      getDiscountType: [PeCouponTypeBuyXGetYGetDiscountTypesEnum.Percentage],
      getDiscountValue: [],
      maxUsesPerOrder: [false],
      maxUsesPerOrderValue: [],
      discountValue: [],
    }),   
  });

  startDatePlaceholder = new Date();
  endDatePlaceholder = new Date();

  constructor(
    private apiService: PeCouponsApi,
    private formBuilder: FormBuilder,
    private localConstantsService: LocaleConstantsService,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private pebEnvService: PebEnvService,
    private router: Router,
    private matDialog: MatDialog,
  ) {
    this.endDatePlaceholder.setDate(this.startDatePlaceholder.getDate() + 1);
  }

  openDatepicker(): void {
    const dialog = this.matDialog.open(PeCouponsDatepickerComponent, {
      // backdropClass: 'peb-mail-modal-backdrop',
      panelClass: 'pe-coupons-datepicker-rounded-panel',
      disableClose: true,
      // data: {
      //   schedule: this.formGroup.get('schedule'),
      //   sendRequest: (schedule: ScheduleModel) => {
      //     const campaignInput: CampaignInput = {
      //       name: this.formGroup.get('name').value,
      //       date: moment().format(),
      //       status: CampaignStatus.new,
      //       schedules: [schedule],
      //       contacts: this.formGroup.get('to').value.map(data => data?.info?.email),
      //       builderMailId: '',
      //     };
      //     return this.saveCampaign(campaignInput);
      //   },
      // },
    });
    dialog.afterClosed().pipe(
      takeUntil(this.destroyed$),
      tap(schedule => {
        if (schedule) {
          console.log(schedule)
          // this.goBack();
        }
      }),
    ).subscribe();
  }

  ngOnInit(): void {   
    const couponId = this.activatedRoute.snapshot.params.couponId;

    if (couponId !== 'add') this.getCoupon(couponId);

    // this.getChannel();
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

  // getChannel() {
  //   this.apiService.getChannel().pipe(
  //     tap(channel => console.log(channel)),
  //     takeUntil(this.destroyed$)
  //   ).subscribe();
  // }

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
        this.couponForm.controls.code.disable();
        this.couponForm.get('setEndDate').patchValue(coupon.endDate ? true : false);
        this.changeDetectorRef.markForCheck();
      }),
      takeUntil(this.destroyed$),
    ).subscribe();
  }

  getContactGroups() {
    this.apiService.getContactGroups().pipe(
      map(request => request.data.groups.nodes.map(group => {
        return { 
          id: group.id,
          title: group.name
        } 
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
        if (changes === PeCouponTypeBuyXGetYItemTypeEnum.SpecificProducts) type.get('buyCollections').patchValue([], { emitEvent: false })
        if (changes === PeCouponTypeBuyXGetYItemTypeEnum.SpecificCategories) type.get('buyProducts').patchValue([], { emitEvent: false })
      }),
      takeUntil(this.destroyed$)
    ).subscribe();

    type.get('getType').valueChanges.pipe(
      tap(changes => {
        if (changes === PeCouponTypeBuyXGetYItemTypeEnum.SpecificProducts) type.get('getCollections').patchValue([], { emitEvent: false })
        if (changes === PeCouponTypeBuyXGetYItemTypeEnum.SpecificCategories) type.get('getProducts').patchValue([], { emitEvent: false })
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

  generateCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = '';
    for (let i = 0; i < 12; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    this.couponForm.get('code').patchValue(result.toUpperCase());
  }

  onDiscard() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  onSubmit() {
    const couponId = this.coupon?._id;

    const controls = this.couponForm.controls;
    controls.code.enable();

    this.couponForm.clearValidators();

    controls.code.setValidators([Validators.required]);
    controls.code.updateValueAndValidity();
    controls.businessId.setValidators([Validators.required]);
    controls.businessId.updateValueAndValidity();
    controls.description.setValidators([Validators.required]);
    controls.description.updateValueAndValidity();
    controls.name.setValidators([Validators.required]);
    controls.name.updateValueAndValidity();
    controls.startDate.setValidators([Validators.required]);
    controls.startDate.updateValueAndValidity();

    const value = this.couponForm.value;

    if (value.setEndDate) {
      controls.endDate.setValidators([Validators.required]);
      controls.endDate.updateValueAndValidity();
    }

    if (value.customerEligibility === PeCouponTypeCustomerEligibilityEnum.SpecificCustomers) {
      controls.customerEligibilitySpecificCustomers.setValidators([Validators.required]);
      controls.customerEligibilitySpecificCustomers.updateValueAndValidity();
    }

    if (value.customerEligibility === PeCouponTypeCustomerEligibilityEnum.SpecificGroupsOfCustomers) {
      controls.customerEligibilityCustomerGroups.setValidators([Validators.required]);
      controls.customerEligibilityCustomerGroups.updateValueAndValidity();
    }

    let body;

    if (this.couponForm.value.type.type === PeCouponTypeEnum.Percentage) body = this.getPercentage(value);
    if (this.couponForm.value.type.type === PeCouponTypeEnum.FixedAmount) body = this.getFixedAmount(value);
    if (this.couponForm.value.type.type === PeCouponTypeEnum.FreeShipping) body = this.getFreeShipping(value);
    if (this.couponForm.value.type.type === PeCouponTypeEnum.BuyXGetY) body = this.getBuyXGetY(value);

    if (this.couponForm.valid) {
      if (couponId) {
        this.apiService.updateCoupon(couponId, body).pipe(
          takeUntil(this.destroyed$),
        ).subscribe(() => this.router.navigate(['../'], { relativeTo: this.activatedRoute }))
      } else {
        this.apiService.createCoupon(body).pipe(
          takeUntil(this.destroyed$),
        ).subscribe(() => this.router.navigate(['../'], { relativeTo: this.activatedRoute }))
      }
    }
  }

  deleteNull(object) {
    Object.keys(object).forEach((key) => {
      if (object[key] === null || object[key].length === 0) {
        delete object[key] === object;
      }
    });
  }

  getPercentage(value) {
    const body = {
      code: value.code,
      businessId: value.businessId,
      endDate: value.endDate ?? null,
      description: value.description,
      name: value.name,
      startDate: value.startDate,
      limits: {
        limitOneUsePerCustomer: value.limits.limitOneUsePerCustomer ?? false,
        limitUsage: value.limits.limitUsage ?? false,
        limitUsageAmount: Number(value.limits.limitUsageAmount) ?? null,
      },
      channelSetsIds: value.channelSetsIds ?? [],
      type: {
        type: value.type.type,
        discountValue: Number(value.type.discountValue),
        appliesTo: value.type.appliesTo,
        appliesToProducts: value.type.appliesToProducts ?? [],
        appliesToCategories: value.type.appliesToCategories ?? [],
        minimumRequirements: value.type.minimumRequirements ?? false,
      },
      status: value.status ?? PeCouponsStatusEnum.Unactive,
      customerEligibility: value.customerEligibility,
      customerEligibilitySpecificCustomers: value.customerEligibilitySpecificCustomers ?? [],
      customerEligibilityCustomerGroups: value.customerEligibilityCustomerGroups ?? []
    }

    
    const limits = (this.couponForm.get('limits') as FormGroup).controls;
    const type = (this.couponForm.get('type') as FormGroup).controls;

    if (value.limits.limitOneUsePerCustomer) {
      limits.limitUsageAmount.setValidators([Validators.required])
      limits.limitUsageAmount.updateValueAndValidity();
    };

    type.discountValue.setValidators([Validators.required]);
    type.discountValue.updateValueAndValidity();

    if (value.type.appliesTo === PeCouponTypeAppliedToEnum.SpecificCategories) {
      type.appliesToCategories.setValidators([Validators.required]);
      type.appliesToCategories.updateValueAndValidity();
    }

    if (value.type.appliesTo === PeCouponTypeAppliedToEnum.SpecificProducts) {
      type.appliesToProducts.setValidators([Validators.required]);
      type.appliesToProducts.updateValueAndValidity();
    }

    if (value.type.minimumRequirements !== PeCouponTypeMinimumRequirementsEnum.None) {
      body.type['minimumRequirementsValue'] = Number(value.type.minimumRequirementsValue);

      type.minimumRequirementsValue.setValidators([Validators.required]);
      type.minimumRequirementsValue.updateValueAndValidity();
    }

    return body;
  }

  getBuyXGetY(value) {
    const limits = (this.couponForm.get('limits') as FormGroup).controls;
    const type = (this.couponForm.get('type') as FormGroup).controls;

    if (value.limits.limitOneUsePerCustomer) {
      limits.limitUsageAmount.setValidators([Validators.required])
      limits.limitUsageAmount.updateValueAndValidity();
    };

    type.buyQuantity.setValidators([Validators.required]);
    type.buyQuantity.updateValueAndValidity();

    if (value.type.buyType === PeCouponTypeBuyXGetYItemTypeEnum.SpecificProducts) {
      type.buyProducts.setValidators([Validators.required]);
      type.buyProducts.updateValueAndValidity();
    }

    if (value.type.buyType === PeCouponTypeBuyXGetYItemTypeEnum.SpecificCategories) {
      type.buyCollections.setValidators([Validators.required]);
      type.buyCollections.updateValueAndValidity();
    }

    type.getQuantity.setValidators([Validators.required]);
    type.getQuantity.updateValueAndValidity();

    if (value.type.getType === PeCouponTypeBuyXGetYItemTypeEnum.SpecificProducts) {
      type.getProducts.setValidators([Validators.required]);
      type.getProducts.updateValueAndValidity();
    }

    if (value.type.getType === PeCouponTypeBuyXGetYItemTypeEnum.SpecificCategories) {
      type.getCollections.setValidators([Validators.required]);
      type.getCollections.updateValueAndValidity();
    }

    if (value.type.getDiscountType === PeCouponTypeBuyXGetYGetDiscountTypesEnum.Percentage) {
      type.getDiscountValue.setValidators([Validators.required]);
      type.getDiscountValue.updateValueAndValidity();
    }

    if (value.type.maxUsesPerOrder) {
      type.maxUsesPerOrderValue.setValidators([Validators.required]);
      type.maxUsesPerOrderValue.updateValueAndValidity();
    }
    
    return {
      code: value.code,
      businessId: value.businessId,
      endDate: value.endDate ?? null,
      description: value.description,
      name: value.description,
      startDate: value.startDate,
      limits: {
        limitOneUsePerCustomer: value.limits.limitOneUsePerCustomer ?? false,
        limitUsage: value.limits.limitUsage ?? false,
        limitUsageAmount: Number(value.limits.limitUsageAmount) ?? null
      },
      channelSetsIds: value.channelSetsIds ?? [],
      type: {
        type: value.type.type,
        buyRequirementType: value.type.buyRequirementType,
        buyQuantity: Number(value.type.buyQuantity),
        buyType: value.type.buyType,
        buyProducts: value.type.buyProducts ?? [],
        buyCollections: value.type.buyCollections ?? [],
        getQuantity: Number(value.type.getQuantity),
        getType: value.type.getType,
        getProducts: value.type.getProducts ?? [],
        getCollections: value.type.getCollections ?? [],

        getDiscountType: value.type.getDiscountType,
        getDiscountValue: Number(value.type.getDiscountValue),
        maxUsesPerOrder: value.type.maxUsesPerOrder ?? false,
        maxUsesPerOrderValue: Number(value.type.maxUsesPerOrderValue)
      },
      status: value.status ?? PeCouponsStatusEnum.Unactive,
      customerEligibility: value.customerEligibility,
      customerEligibilitySpecificCustomers: value.customerEligibilitySpecificCustomers ?? [],
      customerEligibilityCustomerGroups: value.customerEligibilityCustomerGroups ?? []
    }
  } 

  getFixedAmount(value) {
    const body = {
      code: value.code,
      businessId: value.businessId,
      description: value.description,
      endDate: value.endDate ?? null,
      name: value.name,
      startDate: value.startDate,
      limits: {
        limitOneUsePerCustomer: value.limits.limitOneUsePerCustomer ?? false,
        limitUsage: value.limits.limitUsage ?? false,
        limitUsageAmount: Number(value.limits.limitUsageAmount) ?? null,
      },
      channelSetsIds: value.channelSetsIds ?? [],
      type: {
        type: value.type.type,
        discountValue: Number(value.type.discountValue),
        appliesTo: value.type.appliesTo,
        appliesToProducts: value.type.appliesToProducts ?? [],
        appliesToCategories: value.type.appliesToCategories ?? [],
        minimumRequirements: value.type.minimumRequirements ?? false,
      },
      status: value.status ?? PeCouponsStatusEnum.Unactive,
      customerEligibility: value.customerEligibility ?? null,
      customerEligibilitySpecificCustomers: value.customerEligibilitySpecificCustomers ?? [],
      customerEligibilityCustomerGroups: value.customerEligibilityCustomerGroups ?? []
    };

    const limits = (this.couponForm.get('limits') as FormGroup).controls;
    const type = (this.couponForm.get('type') as FormGroup).controls;

    if (value.limits.limitOneUsePerCustomer) {
      limits.limitUsageAmount.setValidators([Validators.required])
      limits.limitUsageAmount.updateValueAndValidity();
    };

    type.discountValue.setValidators([Validators.required]);
    type.discountValue.updateValueAndValidity();

    if (value.type.appliesTo === PeCouponTypeAppliedToEnum.SpecificCategories) {
      type.appliesToCategories.setValidators([Validators.required]);
      type.appliesToCategories.updateValueAndValidity();
    }

    if (value.type.appliesTo === PeCouponTypeAppliedToEnum.SpecificProducts) {
      type.appliesToProducts.setValidators([Validators.required]);
      type.appliesToProducts.updateValueAndValidity();
    }

    if (value.type.minimumRequirements !== PeCouponTypeMinimumRequirementsEnum.None) {
      body.type['minimumRequirementsValue'] = Number(value.type.minimumRequirementsValue);

      type.minimumRequirementsValue.setValidators([Validators.required]);
      type.minimumRequirementsValue.updateValueAndValidity();
    }

    return body;
  }

  getFreeShipping(value) {
    const body = {
      code: value.code,
      businessId: value.businessId,
      endDate: value.endDate ?? null,
      description: value.description,
      name: value.name,
      startDate: value.startDate,
      limits: {
        limitOneUsePerCustomer: value.limits.limitOneUsePerCustomer ?? false,
        limitUsage: value.limits.limitUsage ?? false,
        limitUsageAmount: Number(value.limits.limitUsageAmount) ?? null
      },
      channelSetsIds: value.channelSetsIds ?? [],
      type: {
        type: value.type.type,
        freeShippingToCountries: value.type.freeShippingToCountries ?? [],
        freeShippingType: value.type.freeShippingType ?? null,
        excludeShippingRatesOverCertainAmount: value.type.excludeShippingRatesOverCertainAmount ?? false,
        excludeShippingRatesOverCertainAmountValue: Number(value.type.excludeShippingRatesOverCertainAmountValue) ?? null,
        minimumRequirements: value.type.minimumRequirements ?? false,
      },
      status: value.status ?? PeCouponsStatusEnum.Unactive,
      customerEligibility: value.customerEligibility ?? null,
      customerEligibilitySpecificCustomers: value.customerEligibilitySpecificCustomers ?? [],
      customerEligibilityCustomerGroups: value.customerEligibilityCustomerGroups ?? []
    }

    const limits = (this.couponForm.get('limits') as FormGroup).controls;
    const type = (this.couponForm.get('type') as FormGroup).controls;

    if (value.limits.limitOneUsePerCustomer) {
      limits.limitUsageAmount.setValidators([Validators.required])
      limits.limitUsageAmount.updateValueAndValidity();
    };

    if (value.type.freeShippingType === PeCouponTypeFreeShippingTypeEnum.SelectedCountries) {
      type.freeShippingToCountries.setValidators([Validators.required])
      type.freeShippingToCountries.updateValueAndValidity();
    }

    if (value.type.excludeShippingRatesOverCertainAmount) {
      type.excludeShippingRatesOverCertainAmountValue.setValidators([Validators.required])
      type.excludeShippingRatesOverCertainAmountValue.updateValueAndValidity();
    }

    if (value.type.minimumRequirements !== PeCouponTypeMinimumRequirementsEnum.None) {
      body.type['minimumRequirementsValue'] = Number(value.type.minimumRequirementsValue);

      type.minimumRequirementsValue.setValidators([Validators.required]);
      type.minimumRequirementsValue.updateValueAndValidity();
    }

    return body;
  }
}
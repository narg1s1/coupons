import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PebEnvService } from '@pe/builder-core';
import { ReplaySubject, throwError } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';

import { 
  PeCouponTypeEnum,
  PeCouponTypeAppliedToEnum,
  PeCouponTypeMinimumRequirementsEnum,
  PeCouponTypeCustomerEligibilityEnum,
  PeCouponTypeFreeShippingTypeEnum,
  PeCouponTypeBuyXGetYBuyRequirementsTypeEnum,
  PeCouponTypeBuyXGetYItemTypeEnum,
  PeCouponTypeBuyXGetYGetDiscountTypesEnum,
  PeCouponsStatusEnum
} from '../../misc/interfaces/coupon.model';
import { PeCouponsApi } from '../../services/abstract.coupons.api';
import { PeOverlayRef, PE_OVERLAY_DATA } from '../../misc/components/overlay/overlay.service';
import { PeCouponsDatepickerComponent } from '../../misc/components/coupons-datepicker/coupons-datepicker.component';

import * as moment_ from 'moment';
const moment = moment_;

@Component({
  selector: 'pe-coupons-form',
  templateUrl: './coupons-form.component.html',
  styleUrls: ['./coupons-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeCouponsFormComponent implements OnInit, OnDestroy {

  readonly destroyed$ = new ReplaySubject<boolean>();

  coupon;

  edit: boolean = false;

  customersSource;
  groupsOfCustomersSource;

  categories;
  countries;
  customers;
  groupsOfCustomers;
  products;

  types = [
    { label: 'Percentage', value: PeCouponTypeEnum.Percentage },
    { label: 'Fixed amount', value: PeCouponTypeEnum.FixedAmount },
    { label: 'Free shipping', value: PeCouponTypeEnum.FreeShipping },
    { label: 'Buy X get Y', value: PeCouponTypeEnum.BuyXGetY }
  ];

  appliesTo = [
    { label: 'All products', value: PeCouponTypeAppliedToEnum.AllPpoducts },
    { label: 'Specific categories', value: PeCouponTypeAppliedToEnum.SpecificCategories },
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

  freeShippingType = [
    { label: 'All countries', value: PeCouponTypeFreeShippingTypeEnum.AllCountries },
    { label: 'Selected countries', value: PeCouponTypeFreeShippingTypeEnum.SelectedCountries },
  ];

  buyRequirementType = [
    { label: 'Minimum quantity of items', value: PeCouponTypeBuyXGetYBuyRequirementsTypeEnum.MinimumQuantityOfItems },
    { label: 'Minimum purchase amount', value: PeCouponTypeBuyXGetYBuyRequirementsTypeEnum.MinimumPurchaseAmount },
  ];

  buyOrGetType = [
    { label: 'Specific categories', value: PeCouponTypeBuyXGetYItemTypeEnum.SpecificCategories },
    { label: 'Specific products', value: PeCouponTypeBuyXGetYItemTypeEnum.SpecificProducts }
  ];

  atADiscountedValue = [
    { label: 'Percentage', value: PeCouponTypeBuyXGetYGetDiscountTypesEnum.Percentage },
    { label: 'Free', value: PeCouponTypeBuyXGetYGetDiscountTypesEnum.Free },
  ];

  couponForm: FormGroup = this.formBuilder.group({
    businessId: [this.pebEnvService.businessId],
    code: [],
    customerEligibility: [PeCouponTypeCustomerEligibilityEnum.Everyone],
    customerEligibilityCustomerGroups: [[]],
    customerEligibilitySpecificCustomers: [[]],
    description: ['description'], // TODO: it is necessary to form a description based on the data in the form 
    endDate: [],
    endDateDate: [],
    endDateTime: [],
    setEndDate: [false],
    startDate: [],
    startDateDate: [],
    startDateTime: [],
    limits: this.formBuilder.group({
      limitOneUsePerCustomer: [false],
      limitUsage: [false],
      limitUsageAmount: [],
    }),
    name: ['name'], // ???
    type: this.formBuilder.group({
      appliesTo: [PeCouponTypeAppliedToEnum.AllPpoducts],
      appliesToProducts: [[]],
      appliesToCategories: [[]],
      buyRequirementType: [PeCouponTypeBuyXGetYBuyRequirementsTypeEnum.MinimumQuantityOfItems],
      buyQuantity: [],
      buyType: [PeCouponTypeBuyXGetYItemTypeEnum.SpecificCategories],
      buyProducts: [[]],
      buyCategories: [[]],
      discountValue: [null],
      freeShippingType: [PeCouponTypeFreeShippingTypeEnum.AllCountries],
      freeShippingToCountries: [[]],
      getType: [PeCouponTypeBuyXGetYItemTypeEnum.SpecificCategories],
      getQuantity: [],
      getProducts: [[]],
      getCategories: [[]],
      getDiscountType: [PeCouponTypeBuyXGetYGetDiscountTypesEnum.Percentage],
      getDiscountValue: [],
      maxUsesPerOrder: [false],
      maxUsesPerOrderValue: [],
      minimumRequirements: [PeCouponTypeMinimumRequirementsEnum.None],
      minimumRequirementsPurchaseAmount: [],
      minimumRequirementsQuantityOfItems: [],
      type: [PeCouponTypeEnum.Percentage],
    }),
  });

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private peOverlayRef: PeOverlayRef,
    private peApiService: PeCouponsApi,
    private pebEnvService: PebEnvService,
    @Inject(PE_OVERLAY_DATA) public overlayData: any
  ) {}

  ngOnInit() {
    const couponId = this.overlayData.id;

    this.customersSource = this.overlayData.customersSource;
    this.groupsOfCustomersSource = this.overlayData.groupsOfCustomersSource;

    this.categories = this.overlayData.categories;
    this.countries = this.overlayData.countries;
    this.customers = this.overlayData.customers;
    this.groupsOfCustomers = this.overlayData.groupsOfCustomers;
    this.products = this.overlayData.products;

    if (couponId) this.getCoupon(couponId)
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  addToArray(element: any, array: any, arrayName?: string): void {
    const elementId = element?.id ?? element?._id;

    if (arrayName === 'groupsOfCustomers') {
      element = this.groupsOfCustomersSource.find(el => el.id === element.id);
    }

    if (arrayName === 'customers') {
      element = this.customersSource.find(el => el.id === element.id);
    }

    if (!array.some(element => element?.id === elementId || element?._id === elementId)) {
      array.push(arrayName === 'countries' ? { _id: element.id } : element);
    };
  }

  getFromArray(array: any, id: string) {
    return array.find(element => element.id === id || element._id === id);
  }

  removeFromArray(array: any, index: number): void {
    array.splice(index, 1);
  }

  getCoupon(couponId: string) {
    this.peApiService.getCouponById(couponId).pipe(
      tap((coupon) => {
        this.edit = true;

        if (coupon.customerEligibilityCustomerGroups) {
          coupon.customerEligibilityCustomerGroups = coupon.customerEligibilityCustomerGroups.map(customerGroup => {
            return this.groupsOfCustomersSource.find(group => group.id === customerGroup);
          });
        }

        if (coupon.customerEligibilitySpecificCustomers) {
          coupon.customerEligibilitySpecificCustomers = coupon.customerEligibilitySpecificCustomers.map(customer => {
            return this.customersSource.find(contact => contact.id === customer);
          });
        }

        if (coupon.type.appliesToProducts) {
          coupon.type.appliesToProducts = coupon.type.appliesToProducts.map(appliesToProduct => {
            return this.products.find(product => product._id === appliesToProduct);
          })
        }

        if (coupon.type.buyProducts) {
          coupon.type.buyProducts = coupon.type.buyProducts.map(buyProduct => {
            return this.products.find(product => product._id === buyProduct);
          })
        }

        if (coupon.type.buyCategories) {
          coupon.type.buyCategories = coupon.type.buyCategories.map(buyCategory => {
            return this.categories.find(category => category._id === buyCategory);
          })
        }

        if (coupon.type.appliesToCategories) {
          coupon.type.appliesToCategories = coupon.type.appliesToCategories.map(appliesToCategory => {
            return this.categories.find(category => category._id === appliesToCategory);
          })
        }

        if (coupon.type.freeShippingToCountries) {
          coupon.type.freeShippingToCountries = coupon.type.freeShippingToCountries.map(toCountry => {
            return { _id: toCountry };
          })
        }

        if (coupon.type.getProducts) {
          coupon.type.getProducts = coupon.type.getProducts.map(getProduct => {
            return this.products.find(product => product._id === getProduct);
          })
        }

        if (coupon.type.getCategories) {
          coupon.type.getCategories = coupon.type.getCategories.map(getCategory => {
            return this.categories.find(category => category._id === getCategory);
          })
        }

        this.coupon = coupon;
        this.couponForm.patchValue(coupon);
        this.couponForm.controls.code.disable();

        if (coupon.startDate) {
          this.couponForm.get('startDateDate').patchValue(moment(coupon.startDate).format('DD.MM.YYYY'));
          this.couponForm.get('startDateTime').patchValue(moment(coupon.startDate).format('hh:mm'));
        }
        
        if (coupon.endDate) {
          this.couponForm.get('setEndDate').patchValue(coupon.endDate ? true : false);

          this.couponForm.get('endDateDate').patchValue(moment(coupon.endDate).format('DD.MM.YYYY'));
          this.couponForm.get('endDateTime').patchValue(moment(coupon.endDate).format('hh:mm'));
        }

        this.changeDetectorRef.markForCheck();
      }),
      takeUntil(this.destroyed$),
    ).subscribe();
  }

  generateCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = '';

    for (let i = 0; i < 12; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    this.couponForm.get('code').patchValue(result.toUpperCase());
  }

  onClose() {
    this.peOverlayRef.close();
  }

  openDatepicker(controlName: string): void {
    const dialog = this.matDialog.open(PeCouponsDatepickerComponent);
    dialog.afterClosed().pipe(
      takeUntil(this.destroyed$),
      tap(value => {
        if (value) {
          const date = moment(value).format('DD.MM.YYYY');

          this.couponForm.get(controlName).patchValue(date)
        }
      }),
    ).subscribe();
  }

  // 
  // start shit
  // 

  onSave() {
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
    controls.startDateDate.setValidators([Validators.required]);
    controls.startDateDate.updateValueAndValidity();
    controls.startDateTime.setValidators([Validators.required]);
    controls.startDateTime.updateValueAndValidity();

    const value = this.couponForm.value;

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

    body.startDate = moment(`${value.startDateDate} ${value.startDateTime}`, 'DD.MM.YYYY hh:mm:ss').toDate();

    if (value.setEndDate) {
      controls.endDateDate.setValidators([Validators.required]);
      controls.endDateDate.updateValueAndValidity();
      controls.endDateTime.setValidators([Validators.required]);
      controls.endDateTime.updateValueAndValidity();

      body.endDate = moment(`${value.endDateDate} ${value.endDateTime}`, 'DD.MM.YYYY hh:mm:ss').toDate();

      if (!moment(body.startDate).isBefore(body.endDate)) {
        controls.endDateDate.setErrors({ 'isBefore': true });
        controls.endDateTime.setErrors({ 'isBefore': true });
      }

      const status = moment(moment()).isBetween(body.startDate, body.endDate, 'minute');

      body.status = status ? PeCouponsStatusEnum.Active : PeCouponsStatusEnum.Inactive;
    } else {
      const status = moment(moment()).isAfter(body.startDate, 'minute');

      body.status = status ? PeCouponsStatusEnum.Active : PeCouponsStatusEnum.Inactive;
    }

    if (this.couponForm.valid) {
      if (couponId) {
        this.peApiService.updateCoupon(couponId, body).pipe(
          takeUntil(this.destroyed$),
        ).subscribe(() => this.peOverlayRef.close(true));
      } else {
        this.peApiService.createCoupon(body).pipe(
          catchError(response => {  
            controls.code.setErrors({ 'isNotUnique': true })
            this.changeDetectorRef.markForCheck();
            return throwError(response);
          }),
          takeUntil(this.destroyed$),
        ).subscribe(() => this.peOverlayRef.close(true));
      }
    } else {
      if (this.coupon) controls.code.disable();
    }
  }

  getPercentage(value) {
    const body = {
      code: value.code,
      businessId: value.businessId,
      description: value.description,
      name: value.name,
      limits: {
        limitOneUsePerCustomer: value.limits.limitOneUsePerCustomer ?? false,
        limitUsage: value.limits.limitUsage ?? false,
        limitUsageAmount: Number(value.limits.limitUsageAmount) ?? null,
      },
      channelSets: value.channelSets ?? [],
      type: {
        type: value.type.type,
        discountValue: Number(value.type.discountValue),
        appliesTo: value.type.appliesTo,
        appliesToProducts: value.type.appliesToProducts ?? [],
        appliesToCategories: value.type.appliesToCategories ?? [],
        minimumRequirements: value.type.minimumRequirements ?? false,
      },
      status: value.status ?? PeCouponsStatusEnum.Inactive,
      customerEligibility: value.customerEligibility,
      customerEligibilitySpecificCustomers: value.customerEligibilitySpecificCustomers ?? [],
      customerEligibilityCustomerGroups: value.customerEligibilityCustomerGroups ?? []
    }

    
    const limits = (this.couponForm.get('limits') as FormGroup).controls;
    const type = (this.couponForm.get('type') as FormGroup).controls;

    if (value.limits.limitUsage) {
      limits.limitUsageAmount.setValidators([Validators.required])
      limits.limitUsageAmount.updateValueAndValidity();

      if (!Number.isInteger(Number(value.limits.limitUsageAmount))) {
        limits.limitUsageAmount.setErrors({ 'notInt': true });
      }
    };

    type.discountValue.setValidators([Validators.required]);
    type.discountValue.updateValueAndValidity();

    if (!Number.isInteger(Number(value.type.discountValue))) {
      type.discountValue.setErrors({ 'notInt': true });
    }

    if (value.type.appliesTo === PeCouponTypeAppliedToEnum.SpecificCategories) {
      type.appliesToCategories.setValidators([Validators.required]);
      type.appliesToCategories.updateValueAndValidity();
    }

    if (value.type.appliesTo === PeCouponTypeAppliedToEnum.SpecificProducts) {
      type.appliesToProducts.setValidators([Validators.required]);
      type.appliesToProducts.updateValueAndValidity();
    }

    if (value.type.minimumRequirements === PeCouponTypeMinimumRequirementsEnum.MinimumPurchaseAmount) {
      body.type['minimumRequirementsPurchaseAmount'] = Number(value.type.minimumRequirementsPurchaseAmount);

      type.minimumRequirementsPurchaseAmount.setValidators([Validators.required]);
      type.minimumRequirementsPurchaseAmount.updateValueAndValidity();
    }

    if (value.type.minimumRequirements === PeCouponTypeMinimumRequirementsEnum.MinimumQuantityOfItems) {
      const quantity = Number(value.type.minimumRequirementsQuantityOfItems);

      body.type['minimumRequirementsQuantityOfItems'] = quantity;

      type.minimumRequirementsQuantityOfItems.setValidators([Validators.required]);
      type.minimumRequirementsQuantityOfItems.updateValueAndValidity();

      if (!Number.isInteger(quantity)) {
        type.minimumRequirementsQuantityOfItems.setErrors({ 'notInt': true });
      }
    }

    return body;
  }

  getBuyXGetY(value) {
    const limits = (this.couponForm.get('limits') as FormGroup).controls;
    const type = (this.couponForm.get('type') as FormGroup).controls;

    if (value.limits.limitUsage) {
      limits.limitUsageAmount.setValidators([Validators.required])
      limits.limitUsageAmount.updateValueAndValidity();

      if (!Number.isInteger(Number(value.limits.limitUsageAmount))) {
        limits.limitUsageAmount.setErrors({ 'notInt': true });
      }
    };

    type.buyQuantity.setValidators([Validators.required]);
    type.buyQuantity.updateValueAndValidity();

    if (value.type.buyRequirementType === PeCouponTypeBuyXGetYBuyRequirementsTypeEnum.MinimumQuantityOfItems) {
      const quantity = Number(value.type.buyQuantity);
      
      if (!Number.isInteger(quantity)) {
        type.buyQuantity.setErrors({ 'notInt': true });
      }
    }

    if (value.type.buyType === PeCouponTypeBuyXGetYItemTypeEnum.SpecificProducts) {
      type.buyProducts.setValidators([Validators.required]);
      type.buyProducts.updateValueAndValidity();
    }

    if (value.type.buyType === PeCouponTypeBuyXGetYItemTypeEnum.SpecificCategories) {
      type.buyCategories.setValidators([Validators.required]);
      type.buyCategories.updateValueAndValidity();
    }

    type.getQuantity.setValidators([Validators.required]);
    type.getQuantity.updateValueAndValidity();
      
    if (!Number.isInteger(Number(value.type.getQuantity))) {
      type.getQuantity.setErrors({ 'notInt': true });
    }

    if (value.type.getType === PeCouponTypeBuyXGetYItemTypeEnum.SpecificProducts) {
      type.getProducts.setValidators([Validators.required]);
      type.getProducts.updateValueAndValidity();
    }

    if (value.type.getType === PeCouponTypeBuyXGetYItemTypeEnum.SpecificCategories) {
      type.getCategories.setValidators([Validators.required]);
      type.getCategories.updateValueAndValidity();
    }

    if (value.type.getDiscountType === PeCouponTypeBuyXGetYGetDiscountTypesEnum.Percentage) {
      type.getDiscountValue.setValidators([Validators.required]);
      type.getDiscountValue.updateValueAndValidity();
    }

    if (value.type.maxUsesPerOrder) {
      type.maxUsesPerOrderValue.setValidators([Validators.required]);
      type.maxUsesPerOrderValue.updateValueAndValidity();

      const quantity = Number(value.type.maxUsesPerOrderValue);
      
      if (!Number.isInteger(quantity)) {
        type.maxUsesPerOrderValue.setErrors({ 'notInt': true });
      }
    }
    
    return {
      code: value.code,
      businessId: value.businessId,
      description: value.description,
      name: value.description,
      limits: {
        limitOneUsePerCustomer: value.limits.limitOneUsePerCustomer ?? false,
        limitUsage: value.limits.limitUsage ?? false,
        limitUsageAmount: Number(value.limits.limitUsageAmount) ?? null
      },
      channelSets: value.channelSets ?? [],
      type: {
        type: value.type.type,
        buyRequirementType: value.type.buyRequirementType,
        buyQuantity: Number(value.type.buyQuantity),
        buyType: value.type.buyType,
        buyProducts: value.type.buyProducts ?? [],
        buyCategories: value.type.buyCategories ?? [],
        getQuantity: Number(value.type.getQuantity),
        getType: value.type.getType,
        getProducts: value.type.getProducts ?? [],
        getCategories: value.type.getCategories ?? [],

        getDiscountType: value.type.getDiscountType,
        getDiscountValue: Number(value.type.getDiscountValue),
        maxUsesPerOrder: value.type.maxUsesPerOrder ?? false,
        maxUsesPerOrderValue: Number(value.type.maxUsesPerOrderValue)
      },
      status: value.status ?? PeCouponsStatusEnum.Inactive,
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
      name: value.name,
      limits: {
        limitOneUsePerCustomer: value.limits.limitOneUsePerCustomer ?? false,
        limitUsage: value.limits.limitUsage ?? false,
        limitUsageAmount: Number(value.limits.limitUsageAmount) ?? null,
      },
      channelSets: value.channelSets ?? [],
      type: {
        type: value.type.type,
        discountValue: Number(value.type.discountValue),
        appliesTo: value.type.appliesTo,
        appliesToProducts: value.type.appliesToProducts ?? [],
        appliesToCategories: value.type.appliesToCategories ?? [],
        minimumRequirements: value.type.minimumRequirements ?? false,
      },
      status: value.status ?? PeCouponsStatusEnum.Inactive,
      customerEligibility: value.customerEligibility ?? null,
      customerEligibilitySpecificCustomers: value.customerEligibilitySpecificCustomers ?? [],
      customerEligibilityCustomerGroups: value.customerEligibilityCustomerGroups ?? []
    };

    const limits = (this.couponForm.get('limits') as FormGroup).controls;
    const type = (this.couponForm.get('type') as FormGroup).controls;

    if (value.limits.limitUsage) {
      limits.limitUsageAmount.setValidators([Validators.required])
      limits.limitUsageAmount.updateValueAndValidity();

      if (!Number.isInteger(Number(value.limits.limitUsageAmount))) {
        limits.limitUsageAmount.setErrors({ 'notInt': true });
      }
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

    if (value.type.minimumRequirements === PeCouponTypeMinimumRequirementsEnum.MinimumPurchaseAmount) {
      body.type['minimumRequirementsPurchaseAmount'] = Number(value.type.minimumRequirementsPurchaseAmount);

      type.minimumRequirementsPurchaseAmount.setValidators([Validators.required]);
      type.minimumRequirementsPurchaseAmount.updateValueAndValidity();
    }

    if (value.type.minimumRequirements === PeCouponTypeMinimumRequirementsEnum.MinimumQuantityOfItems) {
      const quantity = Number(value.type.minimumRequirementsQuantityOfItems);

      body.type['minimumRequirementsQuantityOfItems'] = quantity;

      type.minimumRequirementsQuantityOfItems.setValidators([Validators.required]);
      type.minimumRequirementsQuantityOfItems.updateValueAndValidity();

      if (!Number.isInteger(quantity)) {
        type.minimumRequirementsQuantityOfItems.setErrors({ 'notInt': true });
      }
    }

    return body;
  }

  getFreeShipping(value) {
    const body = {
      code: value.code,
      businessId: value.businessId,
      description: value.description,
      name: value.name,
      limits: {
        limitOneUsePerCustomer: value.limits.limitOneUsePerCustomer ?? false,
        limitUsage: value.limits.limitUsage ?? false,
        limitUsageAmount: Number(value.limits.limitUsageAmount) ?? null
      },
      channelSets: value.channelSets ?? [],
      type: {
        type: value.type.type,
        freeShippingToCountries: value.type.freeShippingToCountries ?? [],
        freeShippingType: value.type.freeShippingType ?? null,
        excludeShippingRatesOverCertainAmount: value.type.excludeShippingRatesOverCertainAmount ?? false,
        excludeShippingRatesOverCertainAmountValue: Number(value.type.excludeShippingRatesOverCertainAmountValue) ?? null,
        minimumRequirements: value.type.minimumRequirements ?? false,
      },
      status: value.status ?? PeCouponsStatusEnum.Inactive,
      customerEligibility: value.customerEligibility ?? null,
      customerEligibilitySpecificCustomers: value.customerEligibilitySpecificCustomers ?? [],
      customerEligibilityCustomerGroups: value.customerEligibilityCustomerGroups ?? []
    }

    const limits = (this.couponForm.get('limits') as FormGroup).controls;
    const type = (this.couponForm.get('type') as FormGroup).controls;

    if (value.limits.limitUsage) {
      limits.limitUsageAmount.setValidators([Validators.required])
      limits.limitUsageAmount.updateValueAndValidity();

      if (!Number.isInteger(Number(value.limits.limitUsageAmount))) {
        limits.limitUsageAmount.setErrors({ 'notInt': true });
      }
    };

    if (value.type.freeShippingType === PeCouponTypeFreeShippingTypeEnum.SelectedCountries) {
      type.freeShippingToCountries.setValidators([Validators.required])
      type.freeShippingToCountries.updateValueAndValidity();
    }

    if (value.type.excludeShippingRatesOverCertainAmount) {
      type.excludeShippingRatesOverCertainAmountValue.setValidators([Validators.required])
      type.excludeShippingRatesOverCertainAmountValue.updateValueAndValidity();
    }

    if (value.type.minimumRequirements === PeCouponTypeMinimumRequirementsEnum.MinimumPurchaseAmount) {
      body.type['minimumRequirementsPurchaseAmount'] = Number(value.type.minimumRequirementsPurchaseAmount);

      type.minimumRequirementsPurchaseAmount.setValidators([Validators.required]);
      type.minimumRequirementsPurchaseAmount.updateValueAndValidity();
    }

    if (value.type.minimumRequirements === PeCouponTypeMinimumRequirementsEnum.MinimumQuantityOfItems) {
      const quantity = Number(value.type.minimumRequirementsQuantityOfItems);

      body.type['minimumRequirementsQuantityOfItems'] = quantity;

      type.minimumRequirementsQuantityOfItems.setValidators([Validators.required]);
      type.minimumRequirementsQuantityOfItems.updateValueAndValidity();

      if (!Number.isInteger(quantity)) {
        type.minimumRequirementsQuantityOfItems.setErrors({ 'notInt': true });
      }
    }

    return body;
  }

}
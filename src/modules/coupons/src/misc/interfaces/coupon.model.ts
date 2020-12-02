export enum PeCouponTypeEnum {
  Percentage = 'PERCENTAGE',
  FixedAmount = 'FIXED_AMOUNT',
  FreeShipping = 'FREE_SHIPPING',
  BuyXGetY= 'BUY_X_GET_Y',
}

export enum PeCouponsStatusEnum {
  Inactive = 'INACTIVE',
  Active = 'ACTIVE',
}

export enum PeCouponTypeAppliedToEnum {
  AllPpoducts = 'ALL_PRODUCTS',
  SpecificCategories = 'SPECIFIC_CATEGORIES',
  SpecificProducts = 'SPECIFIC_PRODUCTS',
}

export enum PeCouponTypeFreeShippingTypeEnum {
  AllCountries = 'ALL_COUNTRIES',
  SelectedCountries = 'SELECTED_COUNTRIES',
}

export enum PeCouponTypeBuyXGetYBuyRequirementsTypeEnum {
  MinimumQuantityOfItems = 'MINIMUM_QUANTITY_OF_ITEMS',
  MinimumPurchaseAmount = 'MINIMUM_PURCHASE_AMOUNT',
}

export enum PeCouponTypeBuyXGetYGetDiscountTypesEnum {
  Percentage = 'PERCENTAGE',
  Free = 'FREE',
}

export enum PeCouponTypeBuyXGetYItemTypeEnum {
  SpecificCategories = 'SPECIFIC_CATEGORIES',
  SpecificProducts = 'SPECIFIC_PRODUCTS',
}

export enum PeCouponTypeMinimumRequirementsEnum {
  None = 'NONE',
  MinimumQuantityOfItems = 'MINIMUM_QUANTITY_OF_ITEMS',
  MinimumPurchaseAmount = 'MINIMUM_PURCHASE_AMOUNT',
}

export enum PeCouponTypeCustomerEligibilityEnum {
  Everyone = 'EVERYONE',
  SpecificGroupsOfCustomers = 'SPECIFIC_GROUPS_OF_CUSTOMERS',
  SpecificCustomers = 'SPECIFIC_CUSTOMERS',
}

export interface PeCouponContact {

}

export interface PeCouponLimits {
  limitOneUsePerCustomer: boolean;
  limitUsage: boolean;
  limitUsageAmount: number;
}

export interface PeCouponProduct {

}

export interface PeCouponType {
  type: PeCouponTypeEnum;
  discountValue?: number;
  freeShippingType?: PeCouponTypeFreeShippingTypeEnum | string;
  freeShippingToCountries?: string[];
  appliesToCategories?: string[]; //
  appliesToProducts?: string[]; //
  appliesTo?: PeCouponTypeAppliedToEnum | string;
  buyRequirementType: PeCouponTypeBuyXGetYBuyRequirementsTypeEnum | string;
  buyValue: number;
  buyType: PeCouponTypeBuyXGetYItemTypeEnum | string;
  buyItems: string[];
  getType: PeCouponTypeBuyXGetYItemTypeEnum | string
  getItems: string[];
  getQuantity: number;
}

export interface PeCoupon {
  appliesToCategories: string[];
  appliesToProducts: string[];
  businessId: string; 
  channelSetsIds: string[];
  code: string;
  contacts: PeCouponContact[];
  createdAt?: Date;
  minimumRequirements: PeCouponTypeMinimumRequirementsEnum | string;
  minimumRequirementsValue: number;
  customerEligibility: PeCouponTypeCustomerEligibilityEnum | string;
  customerEligibilityCustomerGroups: string[];
  customerEligibilitySpecificCustomers: string[];
  description: string;
  endDate?: Date;
  isAutomaticDiscount?: boolean;
  limits: PeCouponLimits;
  name: string;
  products: PeCouponProduct[];
  startDate: Date,
  status: PeCouponsStatusEnum | string;
  type: PeCouponType;
  updatedAt?: Date;
  __v?: number;
  _id?: string;
}

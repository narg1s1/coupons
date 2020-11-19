export enum PeCouponTypeEnum {
  Percentage = 'PERCENTAGE',
  FixedAmount = 'FIXED_AMOUNT',
  FreeShipping = 'FREE_SHIPPING',
  BuyXGetY= 'BUY_X_GET_Y',
}

export enum PeCouponsStatusEnum {
  Unactive = 'UNACTIVE',
  Active = 'ACTIVE',
}

export enum PeCouponTypeAppliedToEnum {
  AllPpoducts = 'ALL_PRODUCTS',
  SpecificCollections = 'SPECIFIC_COLLECTIONS',
  SpecificProducts = 'SPECIFIC_PRODUCTS',
}

export enum PeCouponTypeFreeShippingTypeEnum {
  AllCountries = 'ALL_COUNTRIES',
  SelectedCountries = 'SELECTED_COUNTRIES',
}

export enum PeCouponTypeBuyXGetYBuyRequirementsEnum {
  MinimumQuantityOfItems = 'MINIMUM_QUANTITY_OF_ITEMS',
  MinimumPurchaseAmount = 'MINIMUM_PURCHASE_AMOUNT',
}
export enum PeCouponTypeBuyXGetYGetDiscountTypesEnum {
  Percentage = 'PERCENTAGE',
  Free = 'FREE',
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
  limitOneCustomer: boolean;
  limitUsage: boolean;
  limitUsageAmount: number;
}

export interface PeCouponProduct {

}

export interface PeCouponType {
  type: PeCouponTypeEnum,
  appliesToCollections: any, //
  appliesToProducts: any, // 
  discountValue: 5, 
  appliesTo: PeCouponTypeAppliedToEnum | string;
}

export interface PeCoupon {
  appliesToCollections: string[];
  appliesToProducts: string[];
  businessId: string; 
  channelSetsIds: string[];
  code: string;
  contacts: PeCouponContact[];
  createdAt?: Date,
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

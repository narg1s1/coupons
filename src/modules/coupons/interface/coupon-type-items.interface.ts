import {
  CouponTypeCountriesEnum,
  CouponTypeCustomerPurchaseEnum,
  CouponTypeMinimumAmountEnum,
  CouponTypeProductEnum,
  CouponTypeUsageEnum,
  CouponTypeUserEnum
} from './coupon.enums';

export interface CouponCountries {
  type: CouponTypeCountriesEnum;
  countries: string[];
}


export interface CouponMinimumAmount {
  type: CouponTypeMinimumAmountEnum;
  minimumAmount: number;
  minimumItems: number;
}


export interface CouponProducts {
  type: CouponTypeProductEnum;
  products: string[];
  categories: string[];
}


export interface CouponUsers {
  type: CouponTypeUserEnum;
  users: string[];
  groups: string[];
}


export interface CouponUsage {
  type: CouponTypeUsageEnum;
  limit: CouponLimitedUsage
}


export interface CouponDates {
  startDate: string;
  endDate: string;
}


export interface CouponCustomerPurchase {
  quantity: number;
  type: CouponTypeCustomerPurchaseEnum;
  products: string[];
  categories: string[];
  discount: number;
  getItFree: boolean;
}


export interface CouponLimitedUsage {
  timesCanBeUsed: number;
  onePerCustomer: boolean;
}

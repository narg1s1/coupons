import {
  CountriesTypeEnum,
  CustomerPurchaseTypeEnum,
  MinimumAmountTypeEnum,
  ProductTypeEnum,
  UsageTypeEnum,
  UserTypeEnum
} from './coupon.enums';

export interface Countries {
  type: CountriesTypeEnum;
  countries: string[];
}


export interface MinimumAmount {
  type: MinimumAmountTypeEnum;
  minimumAmount: number;
  minimumItems: number;
}


export interface Products {
  type: ProductTypeEnum;
  products: string[];
  categories: string[];
}


export interface Users {
  type: UserTypeEnum;
  users: string[];
  groups: string[];
}


export interface Usage {
  type: UsageTypeEnum;
  limit: LimitedUsage
}


export interface Dates {
  startDate: string;
  endDate: string;
}


export interface CustomerPurchase {
  quantity: number;
  type: CustomerPurchaseTypeEnum;
  products: string[];
  categories: string[];
  discount: number;
  getItFree: boolean;
}


export interface LimitedUsage {
  timesCanBeUsed: number;
  onePerCustomer: boolean;
}

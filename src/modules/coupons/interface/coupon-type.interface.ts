import {
  Countries,
  CustomerPurchase,
  Dates,
  MinimumAmount,
  Products,
  Usage,
  Users
} from './coupon-type-items.interface';

export interface PercentageCouponType {
  perccent: number
  minimumAmount?: MinimumAmount
  products: Products
  users: Users
  usage: Usage
  dates: Dates[]
}


export interface FixedAmountCouponType {
  amount?: number;
}


export interface FreeShippingCouponType {
  countries: Countries
  minimumAmount: MinimumAmount
  products: Products
  users: Users
  usage: Usage
}


export interface BuyXGetYCouponType {
  customerBuys: CustomerPurchase;
  customerGets: CustomerPurchase;
  users: Users;
  usage: Usage;
  dates: Dates[];
  status?: boolean;
}

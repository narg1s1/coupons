import { Countries, CustomerPurchase, Dates, MinimumAmount, Products, Usage, Users } from "./coupon-type-items.interface";

export interface PercentageType {
  perccent: number
  minimumAmount?: MinimumAmount
  products: Products
  users: Users
  usage: Usage
  dates: Dates[]
}


export interface FixedAmountType {
  amount?: number;
}


export interface FreeShippingType {
  countries: Countries
  minimumAmount: MinimumAmount
  products: Products
  users: Users
  usage: Usage
}


export interface BuyXGetYType {
  customerBuys: CustomerPurchase;
  customerGets: CustomerPurchase;
  users: Users;
  usage: Usage;
  dates: Dates[];
  status?: boolean;
}

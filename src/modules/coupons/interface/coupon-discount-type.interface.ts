import {
  CouponCountries,
  CouponCustomerPurchase,
  CouponDates,
  CouponMinimumAmount,
  CouponProducts,
  CouponUsage,
  CouponUsers
} from './coupon-type-items.interface';

export interface BaseDiscount {
  users: CouponUsers;
  usage: CouponUsage;
  dates: CouponDates[];
}

export interface PercentageDiscountType extends BaseDiscount {
  percentage: number;
  minimumAmount?: CouponMinimumAmount;
  products: CouponProducts;
}


export interface FixedAmountDiscountType extends BaseDiscount {
  amount?: number;
}


export interface FreeShippingDiscountType extends BaseDiscount {
  countries: CouponCountries;
  minimumAmount: CouponMinimumAmount;
  products: CouponProducts;
}


export interface BuyXGetYDiscountType extends BaseDiscount {
  customerBuys: CouponCustomerPurchase;
  customerGets: CouponCustomerPurchase;
  status?: boolean;
}

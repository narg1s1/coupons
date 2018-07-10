import {
  BuyXGetYDiscountType,
  FixedAmountDiscountType,
  FreeShippingDiscountType,
  PercentageDiscountType
} from './coupon-discount-type.interface';

export interface Coupon {
  name: string;
  code: string;
  expiresAt: string;
  countUsed: number;
  status?: 'enabled' | 'disabled';
  type?: PercentageDiscountType | FixedAmountDiscountType | FreeShippingDiscountType | BuyXGetYDiscountType;
}

import { CouponStatusEnum } from './coupon.enums';
import {
  BuyXGetYCouponType,
  FixedAmountCouponType,
  FreeShippingCouponType,
  PercentageCouponType
} from './coupon-type.interface';

export interface Coupon {
  name: string;
  code: string;
  expiresAt: string;
  countUsed: number;
  status?: CouponStatusEnum;
  type?: PercentageCouponType | FixedAmountCouponType | FreeShippingCouponType | BuyXGetYCouponType;
}

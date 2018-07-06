import { CouponStatus } from "./coupon.type";
import { BuyXGetYType, FixedAmountType, FreeShippingType, PercentageType } from "./coupon-type.interface";

export interface Coupon {
  name: string;
  code: string;
  expiresAt: string;
  countUsed: number;
  status?: CouponStatus;
  type?: PercentageType | FixedAmountType | FreeShippingType | BuyXGetYType;
}

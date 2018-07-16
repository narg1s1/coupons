import { CouponTypeDiscountEnum, UnitTypeEnum, VoucherTypeEnum } from './coupon.enums';

export interface Coupon {
  uuid: number;
  name: string;
  code: string;
  type: VoucherTypeEnum;
  discount?: CouponDiscountTypeInterface;
  gift?: CouponGiftTypeInterface;
  start_date: string;
  expiration_date: string;
  active: boolean;
  redemption: Redemption;

  // TODO: to create interface
  publish: any;
  assets: any;
  metadata: any;

  additional_info: string;
  category: string;
  campaign: string
}


export interface Redemption {
  quantity: number;
  redeemed_quantity: number;
  redeemed_amount: number
  redemption_entries: any[];
  url: string;
}


export interface CouponDiscountTypeInterface {
  type: CouponTypeDiscountEnum,
  percent_off?: number;
  amount_off?: number;
  amount_limit?: number;
  unit_off?: number
  unit_type?: UnitTypeEnum
}


export interface CouponGiftTypeInterface {
  amount: number;
  balance: number;
}

import { CouponTypeDiscountEnum, VoucherTypeEnum } from './coupon.enums';

export interface Coupon {
  name: string;
  code: string;
  type: VoucherTypeEnum;
  type_data: CouponDiscountTypeInterface;
  start_date: string;
  expiration_date: string;
  active: boolean;
  redemption: string;
  publish: string;
  assets: string;
  metadata: string;
  additional_info: string;
  category: Category;
  campaign: Campaign
}


export interface Category {
  uuid: number;
  name: string;
}


export interface Campaign {
  uuid: number;
  name: string;
  start_date: string;
  expiration_date: string;
  vouchers_count: number;
}


export interface CouponDiscountTypeInterface {
  type: CouponTypeDiscountEnum,
  percent_off: number,
  amount_limit?: number
}

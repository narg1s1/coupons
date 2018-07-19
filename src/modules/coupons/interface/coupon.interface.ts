import { CouponTypeDiscountEnum, VoucherTypeEnum } from './coupon.enums';

export interface Coupon {
  uuid?: string;
  code?: string;
  type: VoucherTypeEnum;
  discount: CouponDiscountInterface;
  gift: CouponGiftInterface;
  category: string;
  active: boolean;
  start_date: string;
  expiration_date: string;
  created_at?: string;
  updated_at?: string;
  count_used?: number;
}


export interface CouponDiscountInterface {
  type: CouponTypeDiscountEnum,
  percent?: number;
  amount?: number;
  unit?: number
}


export interface CouponGiftInterface {
  amount: number;
  balance: number;
}


export interface CouponResponse {
  pagination: Pagination
  order: Order,
  collection: Coupon[]
}


export interface Pagination {
  page: number,
  page_count: number,
  per_page: number,
  item_count: number
}


export interface Order {
  field: string,
  direction: string
}

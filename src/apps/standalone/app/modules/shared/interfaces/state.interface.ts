import { Action } from '@ngrx/store';

import { Coupon } from './coupon.interface';

export interface CouponAction extends Action {
  type: string;
  payload?: any;
}

export type ActionFnType = (...args : any[]) => CouponAction;

export interface CouponState {
  couponList: Coupon[];
  loading: boolean;
}

export interface RootState {
  coupons: CouponState
}

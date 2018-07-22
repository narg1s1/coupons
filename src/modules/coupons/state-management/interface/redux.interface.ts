import { Action } from '@ngrx/store';

import { Coupon } from '../../interface';

export interface CouponAction extends Action {
  type: string;
  payload?: any;
}

export type ActionFnType = (...args : any[]) => CouponAction;

export interface CouponState {
  couponList: Coupon[];
  loading: boolean;
}

export interface StoreList {
  coupon: CouponState
}

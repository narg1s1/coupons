import { createSelector, MemoizedSelector, Selector } from '@ngrx/store';

import { CouponState, StoreList } from '../interface';
import { Coupon } from '../../interface';

const couponStateSelector: Selector<StoreList, CouponState> = (state: StoreList) =>
  state ? state.coupon : null;


export const selectCouponList: MemoizedSelector<any, Coupon[]> = createSelector(
  couponStateSelector,
  (state: CouponState) => state.couponList
);

export const selectCouponLoading: MemoizedSelector<any, boolean> = createSelector(
  couponStateSelector,
  (state: CouponState) => state.loading
);

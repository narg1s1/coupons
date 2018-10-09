import { createSelector, MemoizedSelector, Selector } from '@ngrx/store';

import { Coupon, CouponState, RootState } from '../../../shared';

const couponsStateSelector: Selector<RootState, CouponState> = (state: RootState) =>
  state ? state.coupons : null;


export const selectCouponList: MemoizedSelector<RootState, Coupon[]> = createSelector(
  couponsStateSelector,
  (state: CouponState) => state.couponList
);


export const selectCouponLoading: MemoizedSelector<RootState, boolean> = createSelector(
  couponsStateSelector,
  (state: CouponState) => state.loading
);

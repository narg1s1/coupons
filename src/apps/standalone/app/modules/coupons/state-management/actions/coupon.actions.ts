import { ActionFnType, CouponAction, Coupon } from '../../../shared';

export enum ActionTypes {
  GET_LOAD_COUPON = '[Coupons] Load coupon list',
  GET_LOAD_COUPON_SUCCESS = '[Coupons] Load coupon list success',
  GET_LOAD_COUPON_ERROR = '[Coupons] Load coupon list error',
  PUT_UPDATE_COUPON = '[Coupons] Update coupon',
  PUT_UPDATE_COUPON_SUCCESS = '[Coupons] Update coupon success',
  PUT_UPDATE_COUPON_ERROR = '[Coupons] Update coupon error',
  PUT_DELETE_COUPON = '[Coupons] Delete coupon',
  PUT_DELETE_COUPON_SUCCESS = '[Coupons] Delete coupon success',
  PUT_DELETE_COUPON_ERROR = '[Coupons] Delete coupon error',
  POST_SAVE_COUPON = '[Coupons] Save coupon',
  POST_SAVE_COUPON_SUCCESS = '[Coupons] Save coupon success',
  POST_SAVE_COUPON_ERROR = '[Coupons] Save coupon error'
}


export const loadCouponList: ActionFnType = (page: number): CouponAction => {
  return {
    type: ActionTypes.GET_LOAD_COUPON,
    payload: page
  };
};


export const loadCouponListSuccess: ActionFnType = (couponList: Coupon[]): CouponAction => {
  return {
    type: ActionTypes.GET_LOAD_COUPON_SUCCESS,
    payload: couponList
  };
};


export const loadCouponListError: ActionFnType = (): CouponAction => {
  return {
    type: ActionTypes.GET_LOAD_COUPON_ERROR
  };
};


export const saveCoupon: ActionFnType = (coupon: Coupon): CouponAction => {
  return {
    type: ActionTypes.POST_SAVE_COUPON,
    payload: coupon
  };
};


export const saveCouponSuccess: ActionFnType = (couponList: Coupon[]): CouponAction => {
  return {
    type: ActionTypes.POST_SAVE_COUPON_SUCCESS,
    payload: couponList
  };
};


export const saveCouponError: ActionFnType = (): CouponAction => {
  return {
    type: ActionTypes.POST_SAVE_COUPON_ERROR
  };
};


export const updateCoupon: ActionFnType = (coupon: Coupon): CouponAction => {
  return {
    type: ActionTypes.PUT_UPDATE_COUPON,
    payload: coupon
  };
};


export const updateCouponSuccess: ActionFnType = (couponList: Coupon[]): CouponAction => {
  return {
    type: ActionTypes.PUT_UPDATE_COUPON_SUCCESS,
    payload: couponList
  };
};


export const updateCouponError: ActionFnType = (): CouponAction => {
  return {
    type: ActionTypes.PUT_UPDATE_COUPON_ERROR
  };
};


export const deleteCoupon: ActionFnType = (coupon: Coupon): CouponAction => {
  return {
    type: ActionTypes.PUT_DELETE_COUPON,
    payload: coupon
  };
};


export const deleteCouponSuccess: ActionFnType = (couponList: Coupon[]): CouponAction => {
  return {
    type: ActionTypes.PUT_DELETE_COUPON_SUCCESS,
    payload: couponList
  };
};


export const deleteCouponError: ActionFnType = (): CouponAction => {
  return {
    type: ActionTypes.PUT_DELETE_COUPON_ERROR
  };
};

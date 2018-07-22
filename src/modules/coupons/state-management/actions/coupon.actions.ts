import { ActionFnType, CouponAction } from '../interface';
import { Coupon } from '../../interface';

export enum ActionTypes {
  GET_LOAD_COUPON = '[Coupon] Load coupon list',
  GET_LOAD_COUPON_SUCCESS = '[Coupon] Load coupon list success',
  GET_LOAD_COUPON_ERROR = '[Coupon] Load coupon list error',
  PUT_UPDATE_COUPON = '[Coupon] Update coupon',
  PUT_UPDATE_COUPON_SUCCESS = '[Coupon] Update coupon success',
  PUT_UPDATE_COUPON_ERROR = '[Coupon] Update coupon error',
  PUT_DELETE_COUPON = '[Coupon] Delete coupon',
  PUT_DELETE_COUPON_SUCCESS = '[Coupon] Delete coupon success',
  PUT_DELETE_COUPON_ERROR = '[Coupon] Delete coupon error',
  POST_SAVE_COUPON = '[Coupon] Save coupon',
  POST_SAVE_COUPON_SUCCESS = '[Coupon] Save coupon success',
  POST_SAVE_COUPON_ERROR = '[Coupon] Save coupon error'
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

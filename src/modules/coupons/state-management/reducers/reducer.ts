import { ActionTypes } from '../actions/index';
import { CouponAction, CouponState } from '../interface/index';

const initialState: CouponState = {
  couponList: [],
  loading: false
};

export function reducer(state: CouponState = initialState, action: CouponAction): CouponState {
  switch (action.type) {
    case ActionTypes.GET_LOAD_COUPON: {
      return {
        ...state,
        loading: true
      };
    }
    case ActionTypes.GET_LOAD_COUPON_SUCCESS: {
      return {
        ...state,
        couponList: action.payload,
        loading: false
      };
    }
    case ActionTypes.GET_LOAD_COUPON_ERROR: {
      return {
        ...state,
        loading: false
      };
    }
    case ActionTypes.PUT_UPDATE_COUPON: {
      return {
        ...state,
        loading: true
      };
    }
    case ActionTypes.PUT_UPDATE_COUPON_SUCCESS: {
      return {
        ...state,
        couponList: action.payload,
        loading: false
      };
    }
    case ActionTypes.PUT_UPDATE_COUPON_ERROR: {
      return {
        ...state,
        couponList: action.payload,
        loading: true
      };
    }
    case ActionTypes.PUT_DELETE_COUPON: {
      return {
        ...state,
        loading: true
      };
    }
    case ActionTypes.PUT_DELETE_COUPON_SUCCESS: {
      return {
        ...state,
        couponList: action.payload,
        loading: false
      };
    }
    case ActionTypes.PUT_DELETE_COUPON_ERROR: {
      return {
        ...state,
        couponList: action.payload,
        loading: true
      };
    }
    case ActionTypes.POST_SAVE_COUPON: {
      return {
        ...state,
        loading: true
      };
    }
    case ActionTypes.POST_SAVE_COUPON_SUCCESS: {
      return {
        ...state,
        couponList: action.payload,
        loading: false
      };
    }
    case ActionTypes.POST_SAVE_COUPON_ERROR: {
      return {
        ...state,
        couponList: action.payload,
        loading: true
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
}

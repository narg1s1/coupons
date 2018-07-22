import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { Observable, empty } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';

import { ApiService } from '../../service';
import { CouponAction, CouponState } from '../interface';
import {
  ActionTypes,
  deleteCouponError,
  deleteCouponSuccess,
  loadCouponListError,
  loadCouponListSuccess,
  saveCouponError,
  saveCouponSuccess,
  updateCouponError,
  updateCouponSuccess
} from '../actions';

@Injectable()
export class CouponEffects {

  @Effect()
  loadCouponList$: Observable<CouponAction> = this.actions.ofType(ActionTypes.GET_LOAD_COUPON).pipe(
    switchMap((action: CouponAction) => {
      return this.apiService.getVoucherList(action.payload.page).pipe(
        mergeMap((data: any[]) => {
          this.store.dispatch(loadCouponListSuccess(data));
          return [];
        }),
        catchError((err, caught) => {
          this.store.dispatch(loadCouponListError());
          return empty();
        })
      );
    })
  );

  @Effect()
  deleteCoupon$: Observable<CouponAction> = this.actions.ofType(ActionTypes.PUT_DELETE_COUPON).pipe(
    switchMap(() => {
      return this.apiService.deleteVoucher(['0']).pipe(
        mergeMap(() => {
          this.store.dispatch(deleteCouponSuccess());
          return [];
        }),
        catchError((err, caught) => {
          this.store.dispatch(deleteCouponError());
          return empty();
        })
      );
    })
  );

  @Effect()
  updateCoupon$: Observable<CouponAction> = this.actions.ofType(ActionTypes.PUT_UPDATE_COUPON).pipe(
    switchMap((payload: any) => {
      return this.apiService.updateVoucher(payload).pipe(
        mergeMap((data: any) => {
          this.store.dispatch(updateCouponSuccess(data));
          return [];
        }),
        catchError((err, caught) => {
          this.store.dispatch(updateCouponError());
          return empty();
        })
      );
    })
  );

  @Effect()
  saveCoupon$: Observable<CouponAction> = this.actions.ofType(ActionTypes.POST_SAVE_COUPON).pipe(
    switchMap((payload: any) => {
      return this.apiService.createVoucher(payload).pipe(
        mergeMap((data: any) => {
          this.store.dispatch(saveCouponSuccess(data));
          return [];
        }),
        catchError((err, caught) => {
          this.store.dispatch(saveCouponError());
          return empty();
        })
      );
    })
  );

  constructor(
    private actions: Actions,
    private apiService: ApiService,
    private store: Store<CouponState>
  ) {}
}

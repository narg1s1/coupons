import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PeCoupon } from '../misc/interfaces/coupon.model';


@Injectable()
export abstract class PeCouponsApi {
  abstract getCouponsList(): Observable<any>;

  abstract getCouponById(couponId: string): Observable<any>;

  abstract getCouponByCode(couponCode: string): Observable<any>;

  abstract createCoupon(coupon: PeCoupon): Observable<any>;

  abstract updateCoupon(couponId: string, coupon: PeCoupon): Observable<any>;

  abstract deteleCoupon(couponId: string): Observable<any>;

  abstract getProducts(): Observable<any>;

  abstract getCategories(): Observable<any>;
}

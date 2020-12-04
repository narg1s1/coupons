import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PeCoupon } from '../misc/interfaces/coupon.interface';


@Injectable()
export abstract class PeCouponsApi {
  abstract getCouponsList(): Observable<PeCoupon[]>;

  abstract getCouponById(couponId: string): Observable<PeCoupon>;

  abstract getCouponByCode(couponCode: string): Observable<PeCoupon>;

  abstract createCoupon(coupon: PeCoupon): Observable<PeCoupon>;

  abstract updateCoupon(couponId: string, coupon: PeCoupon): Observable<PeCoupon>;

  abstract deteleCoupon(couponId: string): Observable<PeCoupon>;

  abstract getProducts(): Observable<any>;

  abstract getCategories(): Observable<any>;

  abstract getChannel(): Observable<any>;

  abstract getContactGroups(): Observable<any>;

  abstract getContacts(): Observable<any>;
}

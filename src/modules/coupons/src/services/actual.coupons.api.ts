import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { PebEnvService } from '@pe/builder-core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeCoupon } from '../misc/interfaces/coupon.model';

import { PeCouponsApi } from './abstract.coupons.api';

export const PE_COUPONS_API_PATH = new InjectionToken<string>('PE_COUPONS_API_PATH');
export const PE_PRODUCTS_API_PATH = new InjectionToken<string>('PE_PRODUCTS_API_PATH');

@Injectable()
export class ActualPeCouponsApi extends PeCouponsApi {
  
  constructor(
    @Inject(PE_COUPONS_API_PATH) private couponsApiPath: string,
    @Inject(PE_PRODUCTS_API_PATH) private productsApiPath: string,
    private http: HttpClient,
    // private envService: PebEnvService,
  ) {
    super();
  }

  getCouponsList(): Observable<any> {
    return this.http.get(`${this.couponsApiPath}/api/coupons`);
  }

  getCouponById(couponId: string): Observable<any> {
    return this.http.get(`${this.couponsApiPath}/api/coupons/${couponId}`);
  }

  getCouponByCode(couponCode: string): Observable<any> {
    return this.http.get(`${this.couponsApiPath}/api/coupons/by-code/${couponCode}`);
  }

  createCoupon(coupon: PeCoupon): Observable<any> {
    return this.http.post(`${this.couponsApiPath}/api/coupons`, coupon);
  }

  updateCoupon(couponId: string, coupon: PeCoupon): Observable<any> {
    return this.http.put(`${this.couponsApiPath}/api/coupons/${couponId}`, coupon);
  }

  deteleCoupon(couponId: string): Observable<null> {
    return this.http.delete<null>(`${this.couponsApiPath}/api/coupons/${couponId}`);
  }

  getProducts() {
    return this.http
      .post(`${this.productsApiPath}/products`, {
        query: `{
          getProducts(
            businessUuid: "3e71661b-4f09-4647-bdb6-0f389e9e7024",
            paginationLimit: 100,
            pageNumber: 1,
            orderBy: "price",
            orderDirection: "desc",
            search: ""
            useNewFiltration: true,
          ) {
            products {
              imagesUrl
              _id
              title
              description
              price
              salePrice
              currency
            }
          }
        }
        `,
      })
  }

  getCategories() {
    return this.http.post(`${this.productsApiPath}/products`, {
      query: `{
        getCategories (
          businessUuid: "3e71661b-4f09-4647-bdb6-0f389e9e7024",
        ) {
          id
          title
        }
      }`,
    });
  }
}
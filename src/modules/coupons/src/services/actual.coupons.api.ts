import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { PebEnvService } from '@pe/builder-core';

import { Observable } from 'rxjs';
import { PeCoupon } from '../misc/interfaces/coupon.model';

import { PeCouponsApi } from './abstract.coupons.api';

export const PE_COUPONS_API_PATH = new InjectionToken<string>('PE_COUPONS_API_PATH');
export const PE_PRODUCTS_API_PATH = new InjectionToken<string>('PE_PRODUCTS_API_PATH');
export const PE_CONTACTS_API_PATH = new InjectionToken<string>('PE_CONTACTS_API_PATH');

@Injectable()
export class ActualPeCouponsApi extends PeCouponsApi {
  
  constructor(
    @Inject(PE_COUPONS_API_PATH) private couponsApiPath: string,
    @Inject(PE_PRODUCTS_API_PATH) private productsApiPath: string,
    @Inject(PE_CONTACTS_API_PATH) private contactsApiPath: string,
    private http: HttpClient,
    private pebEnvService: PebEnvService,
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
    return this.http.post(`${this.productsApiPath}/products`, {
      query: `{
        getProducts(
          businessUuid: "${this.pebEnvService.businessId}",
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
      }`,
    })
  }

  getCategories() {
    return this.http.post(`${this.productsApiPath}/products`, {
      query: `{
        getCategories (
          businessUuid: "${this.pebEnvService.businessId}",
        ) {
          id
          title
        }
      }`,
    });
  }

  getChannel() {
    return this.http.get(`https://channels-backend.test.devpayever.com/api/channel`);
  }

  getContactGroups() {
    return this.http.post(`${this.contactsApiPath}/graphql`, { 
      query: `{
        groups(
          first: 100,
          offset: 0,
          filter: { and: [
            {businessId: {equalTo: "${this.pebEnvService.businessId}"}, }
          ]},
        ) {
          nodes {
            id
            name
          }
          totalCount
          pageInfo {
            hasNextPage
          }
        }
      }`
    })
  }

  getContacts() {
    return this.http.post(`${this.contactsApiPath}/graphql`, { 
      query: `{
        contacts(
          orderBy: CREATED_AT_DESC,
          first: 100,
          offset: 0,
          filter: { and: [
            {businessId: {equalTo: "${this.pebEnvService.businessId}"}, }
          ]},
        ) {
          nodes {
            id
            type
            contactFields {
              nodes {
                id
                value
                field {
                  name
                }
              }
            }
          }
          totalCount
          pageInfo {
            hasNextPage
          }
        }
      }`
    })
  }
}
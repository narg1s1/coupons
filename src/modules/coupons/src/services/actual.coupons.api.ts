import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { PebEnvService } from '@pe/builder-core';
import { EnvironmentConfigInterface, PE_ENV } from '@pe/common';

import { Observable } from 'rxjs';
import { PeCoupon } from '../misc/interfaces/coupon.interface';

import { PeCouponsApi } from './abstract.coupons.api';

export const PE_COUPONS_API_PATH = new InjectionToken<string>('PE_COUPONS_API_PATH');

@Injectable()
export class ActualPeCouponsApi extends PeCouponsApi {
  
  constructor(
    @Inject(PE_ENV) private envConfig: EnvironmentConfigInterface,
    @Inject(PE_COUPONS_API_PATH) private couponsApiPath: string,
    private http: HttpClient,
    private pebEnvService: PebEnvService,
  ) {
    super();
  }

  getCouponsList(): Observable<any> {
    return this.http.get(`${this.couponsApiPath}/business/${this.pebEnvService.businessId}/coupons`);
  }

  getCouponById(couponId: string): Observable<any> {
    return this.http.get(`${this.couponsApiPath}/business/${this.pebEnvService.businessId}/coupons/${couponId}`);
  }

  getCouponByCode(couponCode: string): Observable<any> {
    return this.http.get(`${this.couponsApiPath}/business/${this.pebEnvService.businessId}/coupons/by-code/${couponCode}`);
  }

  createCoupon(coupon: PeCoupon): Observable<any> {
    return this.http.post(`${this.couponsApiPath}/business/${this.pebEnvService.businessId}/coupons`, coupon);
  }

  updateCoupon(couponId: string, coupon: PeCoupon): Observable<any> {
    return this.http.put(`${this.couponsApiPath}/business/${this.pebEnvService.businessId}/coupons/${couponId}`, coupon);
  }

  deteleCoupon(couponId: string): Observable<null> {
    return this.http.delete<null>(`${this.couponsApiPath}/business/${this.pebEnvService.businessId}/coupons/${couponId}`);
  }

  getProducts() {
    return this.http.post(`${this.envConfig.backend.products}/products`, {
      query: `{
        getProducts(
          businessUuid: "${this.pebEnvService.businessId}",
          paginationLimit: 100,
          orderBy: "price",
          orderDirection: "desc",
        ) {
          products {
            _id
            businessUuid
            images
            imagesUrl
            title
            price
            variants {
              _id
              businessUuid
              images
              imagesUrl
              title
              price
              sku
              onSales
              salePrice
            }
            sku
            onSales
            salePrice
          }
        }
      }`,
    })
  }

  getCategories() {
    return this.http.post(`${this.envConfig.backend.products}/products`, {
      query: `{
        getCategories (
          businessUuid: "${this.pebEnvService.businessId}",
        ) {
          _id
          slug
          title
          businessUuid
        }
      }`,
    });
  }

  getChannel() {
    return this.http.get(`https://channels-backend.test.devpayever.com/api/channel`);
  }

  getContactGroups() {
    return this.http.post(`${this.envConfig.backend.contacts}/graphql`, { 
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
            businessId
            name
            isDefault
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
    return this.http.post(`${this.envConfig.backend.contacts}/graphql`, { 
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
            businessId
            contactFields {
              nodes {
                fieldId
                id
                value
                contactId 
                field {
                  id
                  businessId
                  name
                  type
                  groupId
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
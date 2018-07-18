import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { Coupon, CouponResponse } from '../interface';

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) {
  }

  getVoucherList(pageNUmber: number): Observable<CouponResponse> {
    return this.httpClient.get<CouponResponse>(this.getVoucherUrl(pageNUmber));
  }

  createVoucher(data: Coupon): Observable<Coupon> {
    return this.httpClient.post<Coupon>(this.getCreateVoucherUrl(), data);
  }

  getVousherById(uuid: string): Observable<Coupon> {
    return this.httpClient.get<Coupon>(this.getVoucherByIdUrl(uuid));
  }

  updateVoucher(data: Coupon): Observable<Coupon> {
    return this.httpClient.patch<Coupon>(this.getVoucherUpdateUrl(data.uuid), data);
  }

  deleteVoucher(uuidList: string[]): Observable<Response> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: { 'vouchers': uuidList }
    };
    return this.httpClient.delete<Response>(this.getDeleteVoucherUrl(), httpOptions);
  }

  private getVoucherUrl(pageNumber: number): string {
    return `/api/v1/vouchers?page=${pageNumber}`;
  }

  private getCreateVoucherUrl(): string {
    return '/api/v1/vouchers';
  }

  private getVoucherByIdUrl(uuid: string): string {
    return `/api/v1/vouchers/${uuid}`;
  }

  private getVoucherUpdateUrl(uuid: string): string {
    return `/api/v1/vouchers/${uuid}	`;
  }

  private getDeleteVoucherUrl(): string {
    return `/api/v1/vouchers`;
  }
}

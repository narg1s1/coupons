import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {Coupon} from "../interface";

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) {
  }

  getVoucherList(): Observable<Coupon[]> {
    const voucherUrl = this.getVoucherUrl();
    return this.httpClient.get<Coupon[]>(voucherUrl);
  }

  //TODO: to add type
  createVoucher(data: Coupon): Observable<any> {
    return this.httpClient.post<any>(this.getCreateVoucherUrl(), data);
  }

  getVousherData(uuid: number): Observable<Coupon> {
    return this.httpClient.get<Coupon>(this.getVoucherDataUrl(uuid));
  }

  updateVoucher(data: Coupon): Observable<Coupon> {
    return this.httpClient.patch<Coupon>(this.getVoucherUpdateUrl(data.uuid), data);
  }

  toggleVoucherStatus() {

  }

  // TODO: to add type
  deleteVoucher(uuid: number): Observable<any> {
    return this.httpClient.delete<any>(this.getDeleteVoucherUrl(uuid));
  }

  private getVoucherUrl(): string {
    return '/api/v1/vouchers';
  }

  private getCreateVoucherUrl(): string {
    return '/api/v1/vouchers';
  }

  private getVoucherDataUrl(uuid: number): string {
    return `/api/v1/vouchers/${uuid}`;
  }

  private getVoucherUpdateUrl(uuid: number): string {
    return `/api/v1/vouchers/${uuid}	`;
  }

  private getEnabledDisabledUrl(uuid: number): string {
    return `/api/v1/vouchers/${uuid}`;
  }

  private getDeleteVoucherUrl(uuid: number): string {
    return `/api/v1/vouchers/${uuid}`;
  }
}

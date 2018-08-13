import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Coupon, CouponResponse } from '../interfaces';
import { ConfigService } from './config.service';

@Injectable()
export class ApiService {

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) {}

  getVoucherList(pageNUmber: number): Observable<CouponResponse> {
    return this.httpClient.get<CouponResponse>(this.configService.apiUrls.getVouchersUrl(pageNUmber));
  }

  createVoucher(data: Coupon): Observable<Coupon> {
    return this.httpClient.post<Coupon>(this.configService.apiUrls.createVoucherUrl(), data);
  }

  getVousherById(uuid: string): Observable<Coupon> {
    return this.httpClient.get<Coupon>(this.configService.apiUrls.getVoucherUrl(uuid));
  }

  updateVoucher(data: Coupon): Observable<Coupon> {
    return this.httpClient.patch<Coupon>(this.configService.apiUrls.updateVoucherUrl(data.uuid), data);
  }

  deleteVoucher(uuidList: string[]): Observable<Response> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: { 'vouchers': uuidList }
    };
    return this.httpClient.delete<Response>(this.configService.apiUrls.deleteVouchersUrl(), httpOptions);
  }

}

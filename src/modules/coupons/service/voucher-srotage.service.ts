import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { Coupon } from '../interface';

@Injectable()
export class VoucherStorageService {
  voucherStorage$: Subject<Coupon[]> = new Subject();

  private voucherDataList: Coupon[] = [];

  get voucherList(): Coupon[] {
    return this.voucherDataList;
  }

  set voucherList(updatedVoucherList: Coupon[]) {
    if (updatedVoucherList.length !== this.voucherDataList.length) {
      this.voucherDataList = updatedVoucherList;
      this.voucherStorage$.next(updatedVoucherList);
    }
  }

  updateStorage(updatedVoucherList: Coupon[]) {
    this.voucherDataList = updatedVoucherList;
    this.voucherStorage$.next(updatedVoucherList);
  }
}

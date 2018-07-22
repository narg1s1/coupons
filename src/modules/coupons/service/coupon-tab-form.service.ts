import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { TypeFormEnum } from '../interface';

@Injectable()
export class CouponTabFormService {
  submittedForm = new Subject<boolean>();
  activeTabForm: TypeFormEnum = TypeFormEnum.VOUCHER;

  setSubmittedForm(value: boolean): void {
    this.submittedForm.next(value);
  }

  isActiveTabForm(selectedFormTab: TypeFormEnum): boolean {
    return this.activeTabForm === selectedFormTab;
  }
}

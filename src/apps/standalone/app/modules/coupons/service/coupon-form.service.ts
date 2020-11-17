import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { TypeFormEnum } from '../../shared';

@Injectable()
export class CouponFormService {
  submittedForm = new Subject<boolean>();
  activeTabForm: TypeFormEnum = TypeFormEnum.VOUCHER;

  setSubmittedForm(value: boolean): void {
    this.submittedForm.next(value);
  }

  isActiveTabForm(selectedFormTab: TypeFormEnum): boolean {
    return this.activeTabForm === selectedFormTab;
  }
}
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs/internal/Subject';

import { ModalButtonListInterface } from '@pe/ng-kit/modules/modal';

@Component({
  templateUrl: 'coupon-edit.component.html',
})
export class CouponEditComponent {
  buttons: ModalButtonListInterface = {
    'close': {
      title: 'Cancel'
    },
    'edit': {
      title: 'Edit',
      click: () => this.loading = true,
      classes: 'btn-primary btn-link'
    }
  };

  private hider: Subject<boolean> = new Subject();
  private loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  back() {
    this.router.navigate(['/business/xxxlutz/coupons'], { relativeTo: this.route });
  }

  hide() {
    this.hider.next(true);
  }
}

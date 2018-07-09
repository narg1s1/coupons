import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TranslationGuard } from '@pe/ng-kit/modules/translation';

import {
  CouponLayoutComponent,
  CouponGridComponent,
  CouponDuplicateComponent,
  CouponRemoveComponent,
  CouponEditComponent
} from './components';

const routes: Routes = [
  {
    path: 'coupons',
    component: CouponLayoutComponent,
    canActivate: [ TranslationGuard ],
    children: [
      {
        path: '',
        redirectTo: 'coupon-list',
        pathMatch: 'full'
      },
      {
        path: 'coupon-list',
        component: CouponGridComponent,
        children: [
          {
            path: 'duplicate-coupon',
            component: CouponDuplicateComponent
          },
          {
            path: 'edit-coupon',
            component: CouponEditComponent
          },
          {
            path: 'remove-coupon',
            component: CouponRemoveComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponsRoutingModule {
}

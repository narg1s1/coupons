import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TranslationGuard } from '@pe/ng-kit/modules/translation';

import { CouponLayoutComponent, CouponGridComponent } from './components';

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
        component: CouponGridComponent
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

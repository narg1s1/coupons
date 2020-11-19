import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeCouponsEditComponent } from './routes/edit/coupons-edit.component';

import { PeCouponsGridComponent } from './routes/grid/coupons-grid.component';
import { PeCouponsComponent } from './routes/root/coupons-root.component';

const routes: Routes = [
  {
    path: '',
    component: PeCouponsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: PeCouponsGridComponent,
      },
      {
        path: ':couponId',
        component: PeCouponsEditComponent,
      },
      {
        path: 'add',
        component: PeCouponsEditComponent,
      },
    ],
  },
];

// HACK: fix --prod build
// https://github.com/angular/angular/issues/23609
export const RouterModuleForChild = RouterModule.forChild(routes);

@NgModule({
  imports: [RouterModuleForChild],
  exports: [RouterModule],
  providers: []
})
export class PeCouponsRouteModule {}

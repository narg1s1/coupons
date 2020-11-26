import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PeCouponsGridComponent } from './routes/grid/coupons-grid.component';
import { PeCouponsRootComponent } from './routes/root/coupons-root.component';

const routes: Routes = [
  {
    path: '',
    component: PeCouponsRootComponent,
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

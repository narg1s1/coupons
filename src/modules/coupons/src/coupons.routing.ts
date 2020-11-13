import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeCouponsEditComponent } from './routes/edit/coupons-edit.component';

import { PeCouponsGridComponent } from './routes/grid/coupons-grid.component';
import { PeCouponsComponent } from './routes/_root/coupons-root.component';

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
        path: 'edit',
        component: PeCouponsEditComponent,
      },
      // {
      //   path: 'create',
      //   component: PebCampaignCreateComponent,
      // },
      // {
      //   path: 'dashboard',
      //   component: PebShopDashboardComponent,
      //   canActivate: [ ShopThemeGuard ]
      // },
      // {
      //   path: 'settings',
      //   component: PebShopSettingsComponent,
      //   resolve: [ ShopResolver ],
      //   children: [
      //     {
      //       path: '',
      //       component: PebShopGeneralSettingsComponent,
      //     },
      //     {
      //       path: 'local-domain',
      //       component: PebShopLocalDomainSettingsComponent,
      //     },
      //     {
      //       path: 'external-domain',
      //       component: PebShopExternalDomainSettingsComponent,
      //     },
      //     {
      //       path: 'password',
      //       component: PebShopPasswordSettingsComponent,
      //     },
      //   ],
      // },
    ],
  },
];

// HACK: fix --prod build
// https://github.com/angular/angular/issues/23609
export const RouterModuleForChild = RouterModule.forChild(routes);

@NgModule({
  imports: [RouterModuleForChild],
  exports: [RouterModule],
  providers: [
    // ShopThemeGuard
  ]
})
export class PeCouponsRouteModule {}

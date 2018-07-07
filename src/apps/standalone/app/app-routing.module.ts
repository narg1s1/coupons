import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TranslationsGuard } from './guards';

const appRoutes: Routes = [
  {
    path: 'business/:slug',
    loadChildren: '../../../modules/coupons/app.module#CouponsAppModule',
    canActivate: [ TranslationsGuard ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}

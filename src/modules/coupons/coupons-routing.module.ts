import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TranslationGuard } from '@pe/ng-kit/modules/translation';

import { LayoutComponent, GridComponent } from './components';

const routes: Routes = [
  {
    path: 'coupons',
    component: LayoutComponent,
    canActivate: [ TranslationGuard ],
    children: [
      {
        path: '',
        component: GridComponent
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

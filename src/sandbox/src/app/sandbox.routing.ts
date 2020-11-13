import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'coupons'
  },
  // {
  //   path: 'actions',
  //   loadChildren: () => import('./+actions/actions.module').then(
  //     m => m.SandboxActionsModule,
  //   ),
  // },
  {
    path: 'coupons',
    loadChildren: () => import('@pe/coupons').then(
      m => m.PeCouponsModule,
    ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
    }),
  ],
  exports: [
    RouterModule,
  ],
})
export class SandboxRouting { }

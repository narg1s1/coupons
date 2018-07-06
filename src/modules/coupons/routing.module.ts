import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {TestComponent} from './components';

const routes: Routes = [
  {
    path: 'coupons',
    component: TestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
}

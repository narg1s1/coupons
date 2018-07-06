import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RoutingModule } from './routing.module';
import { TestComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule
  ],
  declarations: [ TestComponent ],
  providers: []
})
export class CouponsAppModule {
}

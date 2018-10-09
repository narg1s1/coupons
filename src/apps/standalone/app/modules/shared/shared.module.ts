import { ModuleWithProviders, NgModule } from '@angular/core';

import {
  ApiService,
  ConfigService
} from './services';

@NgModule({})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ApiService,
        ConfigService
      ]
    };
  }

}

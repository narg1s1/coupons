import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PortalModule as CdkPortalModule } from '@angular/cdk/portal';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import {
  MessageBus,
  PebEnvService,
  PEB_ENTITY_NAME,
} from '@pe/builder-core';

import { SandboxRootComponent } from './root/root.component';
import { SandboxRouting } from './sandbox.routing';
import { SandboxEnv } from './sandbox.env';
import { SandboxMessageBus } from './shared/services/message-bus.service';
import { PeEnvInitializer, PeEnvProvider } from './env.provider';
import { PeCouponsApi } from '../../../modules/coupons/src/services/abstract.coupons.api';
import { ActualPeCouponsApi, PE_COUPONS_API_PATH, PE_PRODUCTS_API_PATH } from '../../../modules/coupons/src/services/actual.coupons.api';
import { TokenInterceptor } from '../dev/token.interceptor';
import { SandboxMockCouponsBackend } from '../dev/coupons.api-local';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    CdkPortalModule,
    SandboxRouting,
  ],
  declarations: [SandboxRootComponent],
  providers: [
    {
      provide: PebEnvService,
      useClass: SandboxEnv
    },
    {
      provide: MessageBus,
      useClass: SandboxMessageBus
    },
    {
      provide: PeCouponsApi,
      useClass: ActualPeCouponsApi,
      // useClass: SandboxMockCouponsBackend
    },
    {
      provide: PE_COUPONS_API_PATH,
      useValue: 'https://coupons-backend.test.devpayever.com'
    },
    {
      provide: PE_PRODUCTS_API_PATH,
      useValue: 'https://products-backend.test.devpayever.com',
      // useValue: 'https://products-backend.staging.devpayever.com',
    },
    {
      provide: PEB_ENTITY_NAME,
      useValue: 'coupons',
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    PeEnvProvider,
    PeEnvInitializer,
  ],
  bootstrap: [SandboxRootComponent],
})
export class SandboxModule {}

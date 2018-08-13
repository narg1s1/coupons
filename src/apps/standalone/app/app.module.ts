import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { IconsProviderModule } from '@pe/ng-kit/modules/icons-provider';
import { I18nModule } from '@pe/ng-kit/modules/i18n';
import { TranslationModule } from '@pe/ng-kit/modules/translation';

import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './components';
import { TranslationsGuard } from './guards';
import { SharedModule } from './modules/shared';
import { environment } from '../../../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    IconsProviderModule,
    I18nModule.provide({}),
    TranslationModule.forRoot({
      microPath: 'https://coupons-frontend.payever.de',
      isProd: environment.production
    }),

    AppRoutingModule,

    SharedModule.forRoot(),

    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  declarations: [ RootComponent ],
  bootstrap: [ RootComponent ],
  providers: [ TranslationsGuard ]
})
export class AppModule {}

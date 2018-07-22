import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { environment } from '../../../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,

    IconsProviderModule,
    I18nModule.provide({}),
    TranslationModule.forRoot({
      microKey: 'coupons',
      isProd: environment.production
    }),

    AppRoutingModule,

    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  declarations: [ RootComponent ],
  bootstrap: [ RootComponent ],
  providers: [ TranslationsGuard ]
})
export class AppModule {
}

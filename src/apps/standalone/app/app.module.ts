import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IconsProviderModule } from '@pe/ng-kit/modules/icons-provider';
import { I18nModule } from '@pe/ng-kit/modules/i18n';

import { RootComponent } from './components';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    IconsProviderModule,
    I18nModule.provide({}),
    BrowserAnimationsModule
  ],
  declarations: [ RootComponent ],
  bootstrap: [ RootComponent ]
})
export class AppModule {
}

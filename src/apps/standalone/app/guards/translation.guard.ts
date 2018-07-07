import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Observable } from 'rxjs';

import { TranslationLoaderService } from '@pe/ng-kit/modules/i18n';

import { environment } from '../../../../environments/environment';

@Injectable()
export class TranslationsGuard implements CanActivate {
  constructor(private translationLoaderService: TranslationLoaderService) {
  }

  canActivate(): Observable<boolean> {
    return this.translationLoaderService.loadTranslations(environment.i18nPath, 'coupons-app', environment.i18nVersion);
  }
}

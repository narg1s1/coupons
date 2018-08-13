import { Injectable } from '@angular/core';

import { RestUrlInterface } from '../interfaces';
import * as settings from '../settings';

@Injectable()
export class ConfigService {

  get apiUrls(): RestUrlInterface {
    return settings.apiUrls;
  }

}

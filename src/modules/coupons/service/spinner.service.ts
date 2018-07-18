import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class SpinnerService {
  status: BehaviorSubject<any> = new BehaviorSubject(false);

  private isActive: boolean = false;

  get active(): boolean {
    return this.isActive;
  }

  set active(v: boolean) {
    if (v !== this.isActive) {
      this.isActive = v;
      this.status.next(v);
    }
  }

  start(): void {
    this.active = true;
  }

  stop(): void {
    this.active = false;
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MockData {
  status: Subject<any> = new Subject();

  private data: any = [];

  get active(): any[] {
    return this.data;
  }

  set active(v: any[]) {
    if (v.length !== this.data.length) {
      this.data = v;
      this.status.next(v);
    }
  }

  save(v: any[]) {
    this.data = v;
    this.status.next(v);
  }
}

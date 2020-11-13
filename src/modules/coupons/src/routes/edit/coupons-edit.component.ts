import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';


@Component({
  selector: 'pe-coupons-edit',
  templateUrl: './coupons-edit.component.html',
  styleUrls: ['./coupons-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeCouponsEditComponent implements OnInit {
  constructor() {}

  ngOnInit() {

  }
}
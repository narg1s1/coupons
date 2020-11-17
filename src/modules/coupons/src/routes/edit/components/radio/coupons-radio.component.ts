import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'pe-coupons-radio',
  templateUrl: './coupons-radio.component.html',
  styleUrls: ['./coupons-radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeCouponsRadioComponent implements OnInit {

  @Input() group: string;
  @Input() value: string;

  constructor() {}

  ngOnInit() { }
}
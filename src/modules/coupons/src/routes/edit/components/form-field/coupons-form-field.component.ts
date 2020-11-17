import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { PeCouponsPrefixDirective } from './coupons-prefix.directive';
import { PeCouponsSubscriptDirective } from './coupons-subscript.directive';
import { PeCouponsSuffixDirective } from './coupons-suffix.directive';


@Component({
  selector: 'pe-coupons-form-field',
  templateUrl: './coupons-form-field.component.html',
  styleUrls: ['./coupons-form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeCouponsFormFieldComponent implements AfterViewInit {

  showPrefix = false;
  showSuffix = false;
  showSubscript = false;

  @ContentChild(PeCouponsPrefixDirective) prefix: PeCouponsPrefixDirective;
  @ContentChild(PeCouponsSuffixDirective) suffix: PeCouponsSuffixDirective;
  @ContentChild(PeCouponsSubscriptDirective) subscript: PeCouponsSubscriptDirective;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.showPrefix = this.prefix != null;
    this.showSuffix = this.suffix != null;
    this.showSubscript = this.subscript != null;
    this.changeDetectorRef.detectChanges();
  }
}
import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'pe-coupons-select',
  templateUrl: './coupons-select.component.html',
  styleUrls: ['./coupons-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => PeCouponsSelectComponent),
    }
  ]
})
export class PeCouponsSelectComponent implements ControlValueAccessor {

  @Input() options: any;
  
  selectedOption: string;

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.selectedOption = value;
  }

  onChange: (value: any) => void = () => {};
  onTouched = () => {};

}

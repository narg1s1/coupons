import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'pe-coupons-input',
  templateUrl: './coupons-input.component.html',
  styleUrls: ['./coupons-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => PeCouponsInputComponent),
    }
  ]
})
export class PeCouponsInputComponent implements ControlValueAccessor {

  @ViewChild('input', { static: true }) elementRef: ElementRef;

  @Input() placeholder?: string = '';
  @Input() type?: string = 'text';

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.elementRef.nativeElement.value = value;
  }

  onChange: (value: any) => void = () => {};
  onTouched = () => {};
}

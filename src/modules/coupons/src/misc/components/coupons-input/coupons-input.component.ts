import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
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
export class PeCouponsInputComponent implements ControlValueAccessor, OnInit {

  @ViewChild('input', { static: true }) elementRef: ElementRef;

  @Input() placeholder?: string = '';
  @Input() type?: string = 'text';

  mask: any | boolean = false;

  ngOnInit() {
    if (this.type === 'tim') {
      this.mask = [/\d/, /\d/, ':', /\d/, /\d/];
    }

    if (this.type === 'dat') {
      this.mask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.elementRef.nativeElement.value = value;
  }

  setDisabledState(isDisabled: boolean): void {
    this.elementRef.nativeElement.disabled = isDisabled;
  }

  onChange: (value: any) => void = () => {};
  onTouched = () => {};
}

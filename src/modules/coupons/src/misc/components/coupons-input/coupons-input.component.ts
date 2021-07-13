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

  @Input() placeholder? = '';
  @Input() type? = 'number';
  @Input() min? = 0;
  @Input() max?: number;

  mask: any | boolean = false;

  ngOnInit() {
    if (this.type === 'tim') {
      this.mask = [/\d/, /\d/, ':', /\d/, /\d/];
    }

    if (this.type === 'dat') {
      this.mask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (this.type === 'number') {
      const keyCode = event.keyCode;

      if (keyCode > 47 && keyCode < 58 || keyCode === 44 || keyCode === 46) {
        return true;
      }
      
      return false;
    }
  }

  onKeyUp() {
    if (this.type === 'number' && (this.max || this.min)) {
      const value = Number(this.elementRef.nativeElement.value);

      if (value > this.max) {
        this.elementRef.nativeElement.value = this.max;
        return false;
      }

      if (value < this.min) {
        this.elementRef.nativeElement.value = this.min;
        return false;
      }
    }
  }

  onFocusOut() {
    const value = this.elementRef.nativeElement.value;
    if (this.type === 'dat') {
      if (value) {
        const date = value.split('.');

        let DD: string | number = Number(date[0]);
        let MM: string | number = Number(date[1]);
        let YYYY: string | number = Number(date[2]);
  
        if (DD) {
          if (DD > 31) { DD = 31 };
          if (DD < 10) { DD = '0' + DD };
        } else {
          DD = '01';
        }
  
        if (MM) {
          if (MM > 12) { MM = 12 };
          if (MM < 10) { MM = '0' + MM };
        } else {
          MM = '01';
        }
  
        if (!YYYY) {
          YYYY = '1970';
        }
  
        this.elementRef.nativeElement.value = `${DD}.${MM}.${YYYY}`;
      }
    }

    if (this.type === 'tim') {
      if (value) {
        const time = value.split(':');

        let hh: string | number = Number(time[0]);
        let mm: string | number = Number(time[1]);
  
        if (hh) {
          if (hh > 23) { hh = 23 };
          if (hh < 10) { hh = '0' + hh }
        } else {
          hh = '00';
        }
  
        if (mm) {
          if (mm > 59) { mm = 59 };
          if (mm < 10) { mm = '0' + mm }
        } else {
          mm = '00';
        }
  
        this.elementRef.nativeElement.value = `${hh}:${mm}`;
      }
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

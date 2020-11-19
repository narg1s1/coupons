import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'pe-coupons-autocomplete',
  templateUrl: './coupons-autocomplete.component.html',
  styleUrls: ['./coupons-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeCouponsAutocompleteComponent implements OnInit {

  @Input() items: any;
  @Input() placeholder?: string = 'Search';

  @Output() onSelected: EventEmitter<any> = new EventEmitter();

  @ViewChild('input', { static: true }) elementRef: ElementRef;

  formControl: FormControl = new FormControl('');
  filteredItems: Observable<string[]>;

  constructor() {}

  ngOnInit(): void {
    this.filteredItems = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value))
    );
  }

  optionSelected(value: string): void {
    this.elementRef.nativeElement.blur();
    this.formControl.patchValue('');

    this.onSelected.emit(value);
  }

  private filter(value: string): string[] {
    console.log(value);
    const filterValue: string = this.normalizeValue(value);

    return this.items.filter(item => this.normalizeValue(item.title).includes(filterValue));
  }

  private normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}

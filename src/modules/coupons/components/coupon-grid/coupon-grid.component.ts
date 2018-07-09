import { Component, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  DataViewModeType,
  DataGridAbstractComponent,
  DataGridFilterInterface,
  DataGridTableColumnInterface
} from '@pe/ng-kit/modules/data-grid';

@Component({
  selector: 'coupons-grid',
  templateUrl: 'coupon-grid.component.html'
})
export class CouponGridComponent extends DataGridAbstractComponent<any> {
  viewMode: DataViewModeType = 'list';
  pageNumber: number = 0;
  selectedItems: any[] = [];
  chips: DataGridFilterInterface[] = [];
  columns: DataGridTableColumnInterface[] = [
    { name: 'title', title: 'Name', isActive: true, isToggleable: true },
    { name: 'title1', title: 'Code', isActive: true, isToggleable: true },
    { name: 'title2', title: 'Expiry Date', isActive: true, isToggleable: true },
    { name: 'title3', title: 'No. Used', isActive: true, isToggleable: true },
    { name: 'selected', title: 'Enabled', isActive: true, isToggleable: true },
    { name: 'menu', title: '', isActive: true, isToggleable: true }
  ];
  searchValue: string;

  get activeColumns(): string[] {
    return this.columns
      .filter((column: DataGridTableColumnInterface) => column.isActive)
      .map((column: DataGridTableColumnInterface) => column.name);
  }

  constructor(
    injector: Injector,
    private httpClient: HttpClient
  ) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.fetchProducts(0);
  }

  onRowSelected(item: any): void {
    const itemIndex: number = this.selectedItems.indexOf(item);
    const updatedArray: any[] = this.selectedItems.slice();
    if (itemIndex > -1) {
      updatedArray.splice(itemIndex, 1);
    } else {
      updatedArray.push(item);
    }
    this.selectedItems = updatedArray;
  }

  onChipRemoved(chip: DataGridFilterInterface): void {
    let index: number = this.chips.indexOf(chip);

    if (index >= 0) {
      this.chips.splice(index, 1);
    }
  }

  toggleClick(event: any) {
    event.stopPropagation();
  }

  sortData(event: any): void {
    console.log(event);
  }

  fetchProducts(page: number, search?: string): void {
    this.selectedItems = [];
    let url: string = `https://stage.payever.de/products/api/v1/products?f%5Bbusiness%5D%5Bv%5D%5B%5D=b197bf22-6309-11e7-a2a8-5254008319f0&limit=${this.pageSize}&page=${page || this.pageNumber}`;

    this.pageNumber = page || this.pageNumber;
    if (Boolean(search) || search === '') {
      this.searchValue = search;
      url += `&f[search]=${search}`;
    }

    this.httpClient.get(url)
      .subscribe((products: any) => {
        this.items = products.collection;
        this.allItemsCount = products.pagination.item_count;
      });
  }
}

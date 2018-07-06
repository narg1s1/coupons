import { Component, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  DataViewModeType,
  DataGridAbstractComponent,
  DataGridFilterInterface,
  DataGridTableColumnInterface,
  DataGridSelectBarButtonInterface
} from '@pe/ng-kit/modules/data-grid';

@Component({
  selector: 'layout-module',
  templateUrl: 'layout.component.html'
})
export class LayoutComponent extends DataGridAbstractComponent<any> {
  viewMode: DataViewModeType = 'grid';
  pageNumber: number = 0;
  selectedItems: any[] = [];
  chips: DataGridFilterInterface[] = [];
  selectBarButtons: DataGridSelectBarButtonInterface<any>[] = [
    {
      title: 'Test button',
      onSelect: (selectedItems: any[]) => {
        console.log(selectedItems);
      }
    },
    {
      title: 'Test button1',
      onSelect: (selectedItems: any[]) => {
        console.log(selectedItems);
      }
    },
    {
      title: 'Test button2',
      onSelect: (selectedItems: any[]) => {
        console.log(selectedItems);
      }
    },
    {
      title: 'Test button3',
      onSelect: (selectedItems: any[]) => {
        console.log(selectedItems);
      }
    }
  ];
  columns: DataGridTableColumnInterface[] = [
    { name: 'selected', title: '', isActive: true, isToggleable: true },
    { name: 'title', title: 'title', isActive: true, isToggleable: true },
    { name: 'title1', title: 'field', isActive: true, isToggleable: true },
    { name: 'title2', title: 'field', isActive: true, isToggleable: true },
    { name: 'title3', title: 'field', isActive: true, isToggleable: true },
    { name: 'title4', title: 'field', isActive: true, isToggleable: true },
    { name: 'title5', title: 'field', isActive: false, isToggleable: false }
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

  onSelectBarClosed(): void {
    this.selectedItems = [];
  }

  onUnselected(): void {
    this.selectedItems = [];
  }

  onAllSelected(): void {
    this.selectedItems = this.items.slice();
  }

  onChipRemoved(chip: DataGridFilterInterface): void {
    let index: number = this.chips.indexOf(chip);

    if (index >= 0) {
      this.chips.splice(index, 1);
    }
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

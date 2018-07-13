import { Component, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  DataViewModeType,
  DataGridAbstractComponent,
  DataGridFilterInterface,
  DataGridTableColumnInterface
} from '@pe/ng-kit/modules/data-grid';
import {DialogConfigPresetName, DialogService} from '@pe/ng-kit/modules/dialog';

import { CouponDuplicateComponent } from '../coupon-dublicate';
import { CouponEditComponent } from '../coupon-edit';
import { CouponRemoveComponent } from '../coupon-remove';
import { MockData } from '../../service/mock-data';
import { CouponTypeDiscountEnum, VoucherTypeEnum } from '../../interface/coupon.enums';


const vaucher = {
  code: '34454534543',
  name: 'Code name',
  type: VoucherTypeEnum.DISCOUNT_VOUCHER_TYPE,
  type_data: {
    discount: {
      type: CouponTypeDiscountEnum.PERCENTAGE,
      percent_off: 10,
      amount_limit: 10000
    }
  },
  start_date: '',
  expiration_date: '',
  active: true,
  redemption: '',
  publish: '',
  assets: '',
  metadata: '',
  additional_info: '',
  category: {
    name: ''
  },
  campaign: {
    name: '',
    start_date: '',
    expiration_date: '',
    vouchers_count: 1
  }
};

const mockData = [vaucher];

@Component({
  selector: 'coupons-grid',
  templateUrl: 'coupon-grid.component.html'
})
export class CouponGridComponent extends DataGridAbstractComponent<any> {
  dataViewMode: typeof DataViewModeType = DataViewModeType;
  viewMode: DataViewModeType = this.dataViewMode.List;
  pageNumber: number = 0;
  selectedItems: any[] = [];
  chips: DataGridFilterInterface[] = [];
  columns: DataGridTableColumnInterface[] = [
    { name: 'name', title: 'Name', isActive: true, isToggleable: true },
    { name: 'code', title: 'Code', isActive: true, isToggleable: true },
    { name: 'selected', title: 'Enabled', isActive: true, isToggleable: true },
    { name: 'menu', title: '', isActive: true, isToggleable: true }
  ];
  searchValue: string;

  constructor(
    injector: Injector,
    private httpClient: HttpClient,
    private dialogService: DialogService,
    protected mockData: MockData) {
    super(injector);
  }

  get activeColumns(): string[] {
    return this.columns
      .filter((column: DataGridTableColumnInterface) => column.isActive)
      .map((column: DataGridTableColumnInterface) => column.name);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.mockData.save(mockData);
    this.fetchProducts(0);
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
        //this.items = mockData;
        this.allItemsCount = mockData.length;
      });
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

  onToggleClick(event: any) {
    event.stopPropagation();
  }

  onOpenDuplicateDialog(item: any): void {
    this.dialogService.open(
      CouponDuplicateComponent,
      DialogConfigPresetName.Small,
      { item }
    );
  }

  onOpenEditDialog(item: any): void {
    this.dialogService.open(
      CouponEditComponent,
      DialogConfigPresetName.Small,
      { item }
    );
  }

  onOpenRemoveDialog(item: any): void {
    this.dialogService.open(
      CouponRemoveComponent,
      DialogConfigPresetName.Small,
      { item }
    );
  }
}

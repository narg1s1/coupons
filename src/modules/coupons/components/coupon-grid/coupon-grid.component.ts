import { Component, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import {
  DataViewModeType,
  DataGridAbstractComponent,
  DataGridTableColumnInterface
} from '@pe/ng-kit/modules/data-grid';
import { DialogConfigPresetName, DialogService } from '@pe/ng-kit/modules/dialog';

import { CouponDuplicateComponent } from '../coupon-dublicate';
import { CouponEditComponent } from '../coupon-edit';
import { CouponRemoveComponent } from '../coupon-remove';
import { ApiService } from '../../service';
import { Coupon } from '../../interface';
import { CouponState } from '../../state-management/interface';
import { loadCouponList, saveCoupon } from '../../state-management/actions';
import { selectCouponList } from '../../state-management/selectors';

@Component({
  selector: 'coupons-grid',
  templateUrl: 'coupon-grid.component.html'
})
export class CouponGridComponent extends DataGridAbstractComponent<Coupon> {
  searchValue: string;
  pageNumber: number = 0;
  selectedItems: any[] = [];
  dataViewMode: typeof DataViewModeType = DataViewModeType;
  viewMode: DataViewModeType = this.dataViewMode.List;
  couponList$: Observable<Coupon[]> = null;
  columns: DataGridTableColumnInterface[] = [
    { name: 'name', title: 'Name', isActive: true, isToggleable: true },
    { name: 'code', title: 'Code', isActive: true, isToggleable: true },
    { name: 'expiry_date', title: 'Expiry date', isActive: true, isToggleable: true },
    { name: 'selected', title: 'Enabled', isActive: true, isToggleable: true },
    { name: 'menu', title: '', isActive: true, isToggleable: true }
  ];

  constructor(
    injector: Injector,
    private httpClient: HttpClient,
    private dialogService: DialogService,
    private apiService: ApiService,
    private store: Store<CouponState>) {
    super(injector);
  }

  get activeColumns(): string[] {
    return this.columns
      .filter((column: DataGridTableColumnInterface) => column.isActive)
      .map((column: DataGridTableColumnInterface) => column.name);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.couponList$ = this.store.select(selectCouponList);
    this.fetchProducts(0);
  }

  fetchProducts(page: number, search?: string): void {
    this.selectedItems = [];
    this.pageNumber = page || this.pageNumber;

    this.store.dispatch(loadCouponList({ page }));
  }

  sortData(event: any): void {
    console.log(event);
  }

  onToggleClick(event: any, coupon: Coupon) {
    const updatedCoupon = {
      ...coupon,
      active: !coupon.active
    };
    this.store.dispatch(saveCoupon(updatedCoupon));
    event.stopPropagation();
  }

  onOpenDuplicateDialog(coupon: Coupon): void {
    this.dialogService.open(
      CouponDuplicateComponent,
      DialogConfigPresetName.Small,
      { coupon }
    );
  }

  onOpenEditDialog(coupon: Coupon): void {
    this.dialogService.open(
      CouponEditComponent,
      DialogConfigPresetName.Small,
      { coupon }
    );
  }

  onOpenRemoveDialog(coupon: Coupon): void {
    this.dialogService.open(
      CouponRemoveComponent,
      DialogConfigPresetName.Small,
      { coupon }
    );
  }
}

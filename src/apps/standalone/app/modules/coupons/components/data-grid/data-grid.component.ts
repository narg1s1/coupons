import { Component, Injector } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import {
  DataViewModeType,
  DataGridAbstractComponent,
  DataGridTableColumnInterface
} from '@pe/ng-kit/modules/data-grid';
import { DialogConfigPresetName, DialogService } from '@pe/ng-kit/modules/dialog';

import { ModalDuplicateCouponComponent, ModalEditCouponComponent, ModalRemoveCouponComponent } from '../modals';
import { Coupon, RootState } from '../../../shared';
import { loadCouponList, saveCoupon } from '../../state-management/actions';
import { selectCouponList } from '../../state-management/selectors';

@Component({
  selector: 'coupons-data-grid',
  templateUrl: 'data-grid.component.html'
})
export class CouponsDataGridComponent extends DataGridAbstractComponent<Coupon> {
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
    private dialogService: DialogService,
    private store: Store<RootState>
  ) {
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
    event.stopPropagation();
    const updatedCoupon = {
      ...coupon,
      active: !coupon.active
    };
    this.store.dispatch(saveCoupon(updatedCoupon));
  }

  onOpenDuplicateDialog(coupon: Coupon): void {
    this.dialogService.open(
      ModalDuplicateCouponComponent,
      DialogConfigPresetName.Small,
      { coupon }
    );
  }

  onOpenEditDialog(coupon: Coupon): void {
    this.dialogService.open(
      ModalEditCouponComponent,
      DialogConfigPresetName.Small,
      { coupon }
    );
  }

  onOpenRemoveDialog(coupon: Coupon): void {
    this.dialogService.open(
      ModalRemoveCouponComponent,
      DialogConfigPresetName.Small,
      { coupon }
    );
  }

}

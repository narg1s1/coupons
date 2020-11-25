import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  MenuSidebarFooterData,
  PeDataGridFilterType,
  PeDataGridItem,
  PeDataGridMultipleSelectedAction,
  PeDataGridSingleSelectedAction,
  PeDataGridSortByAction,
  PeDataGridSortByActionIcon,
  TreeFilterNode,
} from '@pe/data-grid';
import { isEqual, orderBy } from 'lodash';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { PeCoupon } from '../../misc/interfaces/coupon.model';
import { PeCouponsApi } from '../../services/abstract.coupons.api';
import { PeCouponsFormComponent } from '../form/coupons-form.component';

import { PeOverlayRef, PeOverlayService } from '../../misc/components/overlay/overlay.service';


@Component({
  selector: 'pe-coupons-grid',
  templateUrl: './coupons-grid.component.html',
  styleUrls: ['./coupons-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeCouponsGridComponent implements OnInit, OnDestroy {

  private readonly destroyed$ = new Subject();

  private itemsSubject = new BehaviorSubject<PeDataGridItem[]>([]);
  readonly items$ = this.itemsSubject.asObservable();

  get items() {
    return this.itemsSubject.getValue();
  }

  set items(items) {
    this.itemsSubject.next(items);
  }

  filters: PeDataGridFilterType[] = [];

  formGroup = this.formBuilder.group({
    tree: [[]],
    toggle: [false],
  });

  treeLabel = 'My coupons';
  treeHeaderActive = false;
  treeData: TreeFilterNode[] = [
    {
      name: 'Album folder',
      children: [
        {
          name: 'Sub folder',
          children: [
            {
              name: 'Sub-sub folder',
              children: [
                {
                  name: 'Sub-sub-sub folder',
                  children: [
                    {
                      name: 'Sub-sub-sub-sub folder',
                      children:  [
                        {
                          name: 'Sub-sub-sub-sub-sub folder',
                          children: [
                            {
                              name: 'Sub-sub-sub-sub-sub-sub folder',
                            },
                          ]
                        },
                      ],
                    }
                  ]
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  sidebarFooterData: MenuSidebarFooterData = {
    headItem: { title: 'Folder Name' },
    menuItems: [
      { title: 'Rename', onClick: () => { console.log('rename') } },
      { title: 'Move', onClick: () => { console.log('move') } },
      { title: 'Settings', onClick: () => { console.log('settings') } },
      { title: 'Add New Album', onClick: () => { console.log('add new album') } },
      { title: 'Delete', onClick: () => { console.log('delete') } },
    ]
  }

  gridOptions = {
    nameTitle: '',
    customFieldsTitles: [],
  }

  addItem: PeDataGridItem = {
    selected: false,
  };

  selectedItems: PeDataGridItem[] = [];

  public addActions: PeDataGridSingleSelectedAction[] = [
    {
      label: 'New Coupon',
      callback: () => {
        this.router.navigate(['../add'], { relativeTo: this.activatedRoute });
      },
    }
  ];

  public singleSelectedAction: PeDataGridSingleSelectedAction = {
    label: 'Open',
    callback: (id: string) => {
      this.router.navigate(['../', id], { relativeTo: this.activatedRoute });
    },
  };

  public multipleSelectedActions: PeDataGridMultipleSelectedAction[] = [
    {
      label: 'Select all',
      callback: () =>
        (this.selectedItems = this.items.map((p: any) => p.id)),
    },
    {
      label: 'Deselect all',
      callback: () => (this.selectedItems = []),
    },
    {
      label: 'Apply',
      callback: () => {},
    },
    {
      label: 'Close',
      callback: () => {},
    },
  ];

  public sortByActions: PeDataGridSortByAction[] = [
    {
      label: 'Name',
      callback: () => {
        const desc = orderBy(this.items, ['title'], ['desc']);
        const asc = orderBy(this.items, ['title'], ['asc']);

        this.items = isEqual(this.items, desc) ? asc : desc;
      },
      icon: PeDataGridSortByActionIcon.Name,
    },
  ];

  constructor(
    private apiService: PeCouponsApi,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private overlayService: PeOverlayService,
  ) {}

  open() {
    let dialogRef: PeOverlayRef = this.overlayService.open({}, PeCouponsFormComponent);
  }

  private couponGridItemPipe(coupon: PeCoupon) {
    return {
      id: coupon._id,
      title: coupon.code,
      description: coupon.description,
      labels: [coupon.status],
      selected: false,
      actions: [
        {
          label: 'Edit',
          callback: (id: string) => this.router.navigate(['../', id], { relativeTo: this.activatedRoute }),
        },
      ],
    };
  }

  private getCouponsList() {
    this.apiService.getCouponsList().pipe(
      takeUntil(this.destroyed$),
      tap(couponsList => {
        return this.items = couponsList.map(coupon => this.couponGridItemPipe(coupon));
      }),
    ).subscribe();
  }

  ngOnInit() {
    console.log('0.0.1-COUPONF-1.8');
    
    this.getCouponsList();

    this.formGroup.valueChanges.pipe(
      takeUntil(this.destroyed$),
      tap(value => console.log(value)),
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  addCoupon() {
    this.router.navigate(['../add'], { relativeTo: this.activatedRoute })
  }

  onFiltersChanged(event) {
    console.log(event);
  }

  onSearchChanged(string: string): void {
    console.log(string);
  }

}

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationExtras, Router } from '@angular/router';
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
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';


@Component({
  selector: 'peb-coupons-grid',
  templateUrl: './coupons-grid.component.html',
  styleUrls: ['./coupons-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeCouponsGridComponent implements OnInit, OnDestroy {

  private readonly destroyed$ = new Subject();

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
      { title: 'Upload files', onClick: () => { console.log('upload files') } },
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
    id: '0',
    selected: false,
  };

  items: PeDataGridItem[] = [
    {
      id: '1',
      title: 'SPRINGSALE',
      description: 'Buy 2 get 1 free until 24.04.2021',
      selected: false,
      labels: ['active'],
    },
    {
      id: '2',
      title: 'SUMMERSALE',
      description: '-20% off on Collenction Name',
      selected: false,
    },
    {
      id: '3',
      title: 'BLACKFRIDAY',
      description: '-80% off on all items until 18.11.2021',
      selected: false,
    },
    {
      id: '4',
      title: 'CHRISTMASOFF',
      description: '-15% on all items until 30.12.2021',
      selected: false,
    },
    {
      id: '5',
      title: 'Free shipping',
      description: 'Free shipping on all items above $200',
      selected: false,
    },
  ];

  selectedItems: PeDataGridItem[] = [];

  public addActions: PeDataGridSingleSelectedAction[] = [
    {
      label: 'New Coupon',
      callback: () => {
        // this.router.navigate(['../edit'], this.getNavigateParams());
        console.log('new coupon');
      },
    }
  ];

  public singleSelectedAction: PeDataGridSingleSelectedAction = {
    label: 'Open',
    callback: (id: string) => {
      console.log('open');
      // this.loadingProductIdStream$.next(id);
      // this.router.navigate(['../edit', id], this.getNavigateParams());
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
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this.formGroup.valueChanges.pipe(
      takeUntil(this.destroyed$),
      tap(value => console.log(value)),
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private getNavigateParams(): NavigationExtras {
    const navigateParams: NavigationExtras = {};
    if (this.canUseRelativeNavigate()) {
      navigateParams.relativeTo = this.activatedRoute;
      navigateParams.queryParams = {};
      navigateParams.queryParams.addExisting = true;
      navigateParams.queryParams.prevProductsPath = this.activatedRoute.snapshot.url[0].path;
    }
    navigateParams.queryParamsHandling = 'merge';
    return navigateParams;
  }

  private canUseRelativeNavigate(): boolean {
    return (
      this.activatedRoute.snapshot.pathFromRoot.filter((route: ActivatedRouteSnapshot) => route.url.length > 0).length > 0
    );
  }

  onFiltersChanged(event) {
    console.log(event);
  }

  onSearchChanged(string: string): void {
    console.log(string);
  }
}

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
import { LocaleConstantsService } from '@pe/i18n';
import { isEqual, orderBy } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { PeCoupon } from '../../misc/interfaces/coupon.interface';
import { PeCouponCustomer } from '../../misc/interfaces/coupon-customer.interface';
import { PeCouponCustomerGroup } from '../../misc/interfaces/coupon-customer-group.interface';
import { PeCouponCategory } from '../../misc/interfaces/coupon-category.interface';
import { PeCouponCountry } from '../../misc/interfaces/coupon-country.interface';
import { PeCouponOption } from '../../misc/interfaces/coupon-option.interface';
import { PeCouponProduct } from '../../misc/interfaces/coupon-product.interface';
import { PeCouponsApi } from '../../services/abstract.coupons.api';

import { PeCouponsAbstractComponent } from '../../misc/components/coupons-abstract.component';
import { PeCouponsOverlayService } from '../../misc/services/coupons-overlay/coupons-overlay.service';
import { PeCouponsFormComponent } from '../form/coupons-form.component';


@Component({
  selector: 'pe-coupons-grid',
  templateUrl: './coupons-grid.component.html',
  styleUrls: ['./coupons-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeCouponsGridComponent extends PeCouponsAbstractComponent implements OnInit, OnDestroy {

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
      { title: 'Rename', onClick: () => {  } },
      { title: 'Move', onClick: () => {  } },
      { title: 'Settings', onClick: () => {  } },
      { title: 'Add New Album', onClick: () => {  } },
      { title: 'Delete', onClick: () => {  } },
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
        this.open();
      },
    }
  ];

  public singleSelectedAction: PeDataGridSingleSelectedAction = {
    label: 'Open',
    callback: (id: string) => {
      this.open(id);
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
    private formBuilder: FormBuilder,
    private localConstantsService: LocaleConstantsService,
    private overlayService: PeCouponsOverlayService,
  ) {
    super();
  }

  open(couponId?: string) {
    const data = { 
      id: couponId,

      customersSource: this.customersSource,
      groupsOfCustomersSource: this.groupsOfCustomersSource,
      
      categories: this.categories,
      countries: this.countries,
      customers: this.customers,
      groupsOfCustomers: this.groupsOfCustomers,
      products: this.products,
    };

    const dialogRef = this.overlayService.open({ data: data }, PeCouponsFormComponent);

    dialogRef.afterClosed.pipe(
      tap(data => {
        if (data) this.getCouponsList();
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
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
          callback: (id: string) => this.open(id),
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
    this.getCouponsList();

    this.getCategories();
    this.getCountries();
    this.getCustomers();
    this.getGroupsOfCustomers();
    this.getProducts();
  }

  onSearchChanged(string: string): void {  }

  customersSource: PeCouponCustomer[];
  groupsOfCustomersSource: PeCouponCustomerGroup[];

  categories: PeCouponCategory[];
  countries: PeCouponCountry[];
  customers: PeCouponOption[];
  groupsOfCustomers: PeCouponOption[];
  products: PeCouponProduct[];

  getCategories() {
    this.apiService.getCategories().pipe(
      map(request => request.data.getCategories.filter(categories => !!categories)),
      tap(categories => this.categories = categories),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  getCountries() {
    const countryList = this.localConstantsService.getCountryList();

    this.countries = [];

    Object.keys(countryList).map(countryKey => {
      this.countries.push({
        _id: countryKey,
        title: Array.isArray(countryList[countryKey]) ? countryList[countryKey][0] : countryList[countryKey]
      });
    })
  }

  getCustomers() {
    this.apiService.getContacts().pipe(
      map(request => {
        this.customersSource = request.data.contacts.nodes;

        return request.data.contacts.nodes.map(contact => {
          const customer = { id: contact.id, title: null };
          contact.contactFields.nodes.map(node => customer[node.field.name] = node.value);
          customer.title = customer['email'] ?? customer['mobilePhone'];
          return customer;
        })
      }),
      tap(customers => this.customers = customers),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  getGroupsOfCustomers() {
    this.apiService.getContactGroups().pipe(
      map(request => {
        this.groupsOfCustomersSource = request.data.groups.nodes;
        return request.data.groups.nodes.map(group => ({ id: group.id, title: group.name }))
      }),
      tap(groupsOfCustomers => this.groupsOfCustomers = groupsOfCustomers),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  getProducts() {
    this.apiService.getProducts().pipe(
      map(request => request.data.getProducts.products.filter(product => !!product)),
      tap(products => this.products = products),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  trackItem(index: number, item: any) {
    return item._id;
  }

}

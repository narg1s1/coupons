export interface Countries {
  type: 'All regions & countries' | 'Selected countries' | 'Exclude countries';
  countries: string[];
}


export interface MinimumAmount {
  type: 'Any purchase amount or items' | 'Minimum purchase amount' | 'Minimum purchased items';
  minimumAmount: number;
  minimumItems: number;
}


export interface Products {
  type: 'All products' | 'Selected products and categories' | 'Exclude products and categories';
  products: string[];
  categories: string[];
}


export interface Users {
  type: 'Any user' | 'Selected users and groups';
  users: string[];
  groups: string[];
}


export interface Usage {
  type: 'No usage limits' | 'Limited usage';
  limit: LimitedUsage
}


export interface Dates {
  startDate: string;
  endDate: string;
}


export interface CustomerPurchase {
  quantity: number;
  type: 'Any products' | 'Selected products and categories' | 'Excluded products';
  products: string[];
  categories: string[];
  discount: number;
  getItFree: boolean;
}


export interface LimitedUsage {
  timesCanBeUsed: number;
  onePerCustomer: boolean;
}

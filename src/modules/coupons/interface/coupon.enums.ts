export enum CouponStatusEnum {
  ENABLED = 'enabled',
  DISABLED = 'disabled'
}


export enum ProductTypeEnum {
  ALL = 'All products',
  PRODUCTS_AND_CATEGORIES= 'Selected products and categories',
  exclude_products_categories = 'Exclude products and categories'
}


export enum UserTypeEnum {
  ANY = 'Any user',
  USER_AND_GROUPS = 'Selected users and groups'
}


export enum UsageTypeEnum {
  NO_LIMITS = 'No usage limits',
  LIMITED_USAGE = 'Limited usage'
}


export enum CustomerPurchaseTypeEnum {
  ANY = 'Any products',
  PRODUCTS_AND_CATEGORIES = 'Selected products and categories',
  EXCLUDED_PRODUCTS = 'Excluded products'
}


export enum MinimumAmountTypeEnum {
  ANY = 'Any purchase amount or items',
  MIN_PURCHASE_AMOUNT = 'Minimum purchase amount',
  MIN_PURCHASED_ITEMS = 'Minimum purchased items'
}


export enum CountriesTypeEnum {
  ALL = 'All regions & countries',
  COUNTRIES = 'Selected countries',
  EXCLUDED_COUNTRIES = 'Exclude countries'
}

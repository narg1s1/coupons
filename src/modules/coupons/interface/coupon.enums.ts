export enum CouponStatusEnum {
  ENABLED = 'enabled',
  DISABLED = 'disabled'
}


export enum ProductTypeEnum {
  ALL = 'all_products',
  PRODUCTS_AND_CATEGORIES= 'selected_products_and_categories',
  exclude_products_categories = 'exclude_products_and_categories'
}


export enum UserTypeEnum {
  ANY = 'any_user',
  USER_AND_GROUPS = 'selected_users_and_groups'
}


export enum UsageTypeEnum {
  NO_LIMITS = 'no_usage_limits',
  LIMITED_USAGE = 'limited_usage'
}


export enum CustomerPurchaseTypeEnum {
  ANY = 'any_products',
  PRODUCTS_AND_CATEGORIES = 'selected_products_and_categories',
  EXCLUDED_PRODUCTS = 'excluded_products'
}


export enum MinimumAmountTypeEnum {
  ANY = 'any_purchase_amount_or_items',
  MIN_PURCHASE_AMOUNT = 'minimum_purchase_amount',
  MIN_PURCHASED_ITEMS = 'minimum_purchased_items'
}


export enum CountriesTypeEnum {
  ALL = 'all_regions_countries',
  COUNTRIES = 'selected_countries',
  EXCLUDED_COUNTRIES = 'exclude_countries'
}

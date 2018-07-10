export enum  CouponTypeProductEnum {
  ALL = 'all_products',
  PRODUCTS_AND_CATEGORIES = 'selected_products_and_categories',
  EXCLUDED_PRODUCTS_AND_CATEGORIES = 'exclude_products_and_categories'
}


export enum CouponTypeUserEnum {
  ANY = 'any_user',
  USER_AND_GROUPS = 'selected_users_and_groups'
}


export enum CouponTypeUsageEnum {
  NO_LIMITS = 'no_usage_limits',
  LIMITED_USAGE = 'limited_usage'
}


export enum CouponTypeCustomerPurchaseEnum {
  ANY = 'any_products',
  PRODUCTS_AND_CATEGORIES = 'selected_products_and_categories',
  EXCLUDED_PRODUCTS = 'excluded_products'
}


export enum CouponTypeMinimumAmountEnum {
  ANY = 'any_purchase_amount_or_items',
  MIN_PURCHASE_AMOUNT = 'minimum_purchase_amount',
  MIN_PURCHASED_ITEMS = 'minimum_purchased_items'
}


export enum CouponTypeCountriesEnum {
  ALL = 'all_regions_countries',
  COUNTRIES = 'selected_countries',
  EXCLUDED_COUNTRIES = 'exclude_countries'
}

export enum CouponTypeDiscountEnum {
  PERCENTAGE = 'percentage',
  FIXED_AMOUNT = 'fixed_amount',
  BUY_X_GET_Y = 'buy_x_get_y',
  FREE_SHIPPING = 'free_shipping'
}
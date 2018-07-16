export interface CouponCreateForm {
  voucher_type: string;
  discount_type: string;
  percent_off: string;
  amount_off: number;
  unit_off: number;
  unit_type: string;
  gift_amount: string;
  category: string;
  additional_info: string;
  start_date: string;
  expiration_date: string;
  active_voucher: boolean;
  voucher_name: string;
  voucher_code: string;
  redemption_quantity: string;
}

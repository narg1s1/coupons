export interface CouponCreateForm {
  type: string;
  discount_type: string;
  percent_off: string;
  amount_off: number;
  unit_off: number;
  gift_amount: string;
  gift_balance: string;
  category: string;
  start_date: string;
  expiration_date: string;
  active: boolean;
}

export interface CampaignForm {
  name: string;
  start_date: string;
  expiration_date: string;
}

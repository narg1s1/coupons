import {
  DatepickerMode,
  DatepickerStartView,
  DatePresets,
  AddonType,
  AddonStyle,
  FormScheme
} from '@pe/ng-kit/modules/form';

import { CouponTypeDiscountEnum, VoucherTypeEnum } from '../../../../shared';

export const formScheme: FormScheme = {
  fieldsets: {
    mainFieldSet: [
      {
        name: 'type',
        type: 'select',
        fieldSettings: {
          classList: 'col-xs-12',
          label: 'Voucher type',
          required: true
        },
        selectSettings: {
          options: [
            {
              label: 'Discount voucher type',
              value: VoucherTypeEnum.DISCOUNT_VOUCHER_TYPE
            },
            {
              label: 'Gift voucher type',
              value: VoucherTypeEnum.GIFT_VOUCHER_TYPE
            }
          ]
        }
      },
      {
        name: 'discount_type',
        type: 'select',
        fieldSettings: {
          classList: 'col-xs-12',
          label: 'Discount type',
          required: true
        },
        selectSettings: {
          options: [
            {
              label: 'Percentage',
              value: CouponTypeDiscountEnum.PERCENTAGE
            },
            {
              label: 'Fixed amount',
              value: CouponTypeDiscountEnum.FIXED_AMOUNT
            },
            {
              label: 'Unit',
              value: CouponTypeDiscountEnum.UNIT
            }
          ]
        }
      },
      {
        name: 'percent_off',
        type: 'input',
        fieldSettings: {
          classList: 'col-xs-12 col-sm-12',
          label: 'Percent off',
          required: true
        },
        inputSettings: {
          placeholder: 'Percentage'
        },
        addonAppend: {
          addonType: AddonType.Text,
          addonStyle: AddonStyle.Filled,
          text: '\u0025'
        },
      },
      {
        name: 'amount_off',
        type: 'input',
        fieldSettings: {
          classList: 'col-xs-12 col-sm-12',
          label: 'Amount off',
          required: true
        },
        inputSettings: {
          placeholder: 'Fixed amount'
        },
        addonAppend: {
          addonType: AddonType.Text,
          addonStyle: AddonStyle.Filled,
          text: '\u20AC'
        }
      },
      {
        name: 'unit_off',
        type: 'input',
        fieldSettings: {
          classList: 'col-xs-12 col-sm-12',
          label: 'Unit off',
          required: true
        },
        inputSettings: {
          placeholder: 'Unit'
        }
      },
      {
        name: 'gift_amount',
        type: 'input',
        fieldSettings: {
          classList: 'col-xs-12 col-sm-12',
          label: 'Gift amount',
          required: true
        },
        inputSettings: {
          placeholder: 'Gift amount'
        }
      },
      {
        name: 'gift_balance',
        type: 'input',
        fieldSettings: {
          classList: 'col-xs-12 col-sm-12',
          label: 'Gift Balance',
          required: true
        },
        inputSettings: {
          placeholder: 'Gift balance'
        }
      },
      {
        name: 'category',
        type: 'input',
        fieldSettings: {
          classList: 'col-xs-12 col-sm-12',
          label: 'Category',
          required: true
        },
        inputSettings: {
          placeholder: 'Category'
        }
      },
      {
        name: 'start_date',
        type: 'date',
        fieldSettings: {
          classList: 'col-xs-12 col-sm-6',
          label: 'Start date',
          required: true
        },
        dateSettings: {
          mode: DatepickerMode.Date,
          placeholder: 'Start date',
          min: DatePresets.default.min,
          max: DatePresets.default.max,
          startView: DatepickerStartView.Year
        }
      },
      {
        name: 'expiration_date',
        type: 'date',
        fieldSettings: {
          classList: 'col-xs-12 col-sm-6',
          label: 'Expiration date',
          required: true
        },
        dateSettings: {
          mode: DatepickerMode.Date,
          placeholder: 'Expiration date',
          min: DatePresets.default.min,
          max: DatePresets.default.max,
          startView: DatepickerStartView.Year
        }
      },
      {
        name: 'active',
        type: 'checkbox',
        fieldSettings: {
          classList: 'col-xs-12 col-sm-12',
          label: 'Active',
          required: false
        }
      }
    ]
  }
};

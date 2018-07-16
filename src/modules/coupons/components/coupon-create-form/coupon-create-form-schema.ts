import {
  DatepickerMode,
  DatepickerStartView,
  DatePresets,
  AddonType,
  AddonStyle,
  ButtonType,
  FormScheme
} from '@pe/ng-kit/modules/form';

import {CouponTypeDiscountEnum, UnitTypeEnum, VoucherTypeEnum} from '../../interface/coupon.enums';

export const formScheme: FormScheme = {
  fieldsets: {
    mainFieldSet: [
      {
        name: 'voucher_name',
        type: 'input',
        fieldSettings: {
          classList: 'col-xs-12 col-sm-12',
          label: 'Voucher name',
          required: true
        },
        inputSettings: {
          placeholder: 'Name'
        }
      },
      {
        name: 'voucher_code',
        type: 'input',
        fieldSettings: {
          classList: 'col-xs-12 col-sm-12',
          label: 'Code',
          required: true
        },
        inputSettings: {
          placeholder: 'Code'
        },
        addonAppend: {
          addonType: AddonType.Buttom,
          buttonType: ButtonType.Button,
          addonStyle: AddonStyle.Filled,
          onClick: () => {debugger},
          text: 'Generate',
          buttonClassList: 'mat-button mat-primary mat-button-link mat-button-bold'
        }
      },
      {
        name: 'voucher_type',
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
          classList: 'col-xs-6 col-sm-6',
          label: 'Unit off',
          required: true
        },
        inputSettings: {
          placeholder: 'Unit'
        }
      },
      {
        name: 'unit_type',
        type: 'select',
        fieldSettings: {
          classList: 'col-xs-6 col-sm-6',
          label: 'Unit type',
          required: true
        },
        selectSettings: {
          options: [
            {
              label: 'Times',
              value: UnitTypeEnum.TIME
            },
            {
              label: 'Items',
              value: UnitTypeEnum.ITEMS
            }
          ]
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
        name: 'category',
        type: 'input',
        fieldSettings: {
          classList: 'col-xs-12 col-sm-12',
          label: 'Category',
          required: true
        },
        inputSettings: {
          placeholder: 'Gift category'
        }
      },
      {
        name: 'additional_info',
        type: 'textarea',
        fieldSettings: {
          classList: 'col-xs-12',
          label: 'Additional info',
          required: true
        },
        textareaSettings: {
          minRows: 5,
          maxRows: 5,
          placeholder: 'Additional info'
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
          mode: DatepickerMode.MonthYear,
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
          mode: DatepickerMode.MonthYear,
          placeholder: 'Expiration date',
          min: DatePresets.default.min,
          max: DatePresets.default.max,
          startView: DatepickerStartView.Year
        }
      },
      {
        name: 'active_voucher',
        type: 'checkbox',
        fieldSettings: {
          classList: 'col-xs-12 col-sm-12',
          label: 'Active',
          required: false
        }
      },
      {
        name: 'redemption_quantity',
        type: 'input',
        fieldSettings: {
          classList: 'col-xs-12 col-sm-12',
          label: 'Redemption',
          required: false
        },
        inputSettings: {
          placeholder: 'Redemption quantity'
        }
      }
    ]
  }
};

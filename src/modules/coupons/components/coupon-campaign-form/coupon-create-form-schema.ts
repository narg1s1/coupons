import { DatepickerMode, DatepickerStartView, DatePresets, FormScheme } from '@pe/ng-kit/modules/form';

export const formScheme: FormScheme = {
  fieldsets: {
    mainFieldSet: [
      {
        name: 'name',
        type: 'input',
        fieldSettings: {
          classList: 'col-xs-12 col-sm-12',
          required: true
        },
        inputSettings: {
          placeholder: 'Name'
        }
      },
      {
        name: 'start_date',
        type: 'date',
        fieldSettings: {
          classList: 'col-xs-12 col-sm-6',
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
          required: true
        },
        dateSettings: {
          mode: DatepickerMode.MonthYear,
          placeholder: 'Expiration date',
          min: DatePresets.default.min,
          max: DatePresets.default.max,
          startView: DatepickerStartView.Year
        }
      }
    ]
  }
};

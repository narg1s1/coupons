import {
  Component,
  ChangeDetectionStrategy,
  Injector,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { Validators } from '@angular/forms';

import {
  ErrorBag,
  FormScheme,
  FormSchemeField,
  FormAbstractComponent
} from '@pe/ng-kit/modules/form';

import { formScheme } from './coupon-create-form-schema';
import { CouponTypeDiscountEnum, VoucherTypeEnum } from '../../interface/coupon.enums';
import { CouponCreateForm } from '../../interface/coupon-form.interface';
import { CouponTabFormService, TypeFormEnum } from '../../service';

const vaucher = {
  code: '34454534543',
  name: 'Code name',
  type: VoucherTypeEnum.DISCOUNT_VOUCHER_TYPE,
  type_data: {
    discount: {
      type: CouponTypeDiscountEnum.PERCENTAGE,
      percent_off: 10,
      amount_limit: 10000
    }
  },
  start_date: '',
  expiration_date: '',
  active: true,
  redemption: '',
  publish: '',
  assets: '',
  metadata: '',
  additional_info: '',
  category: {
    name: ''
  },
  campaign: {
    name: '',
    start_date: '',
    expiration_date: '',
    vouchers_count: 1
  }
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'coupon-create-form',
  templateUrl: 'coupon-create-form.component.html',
  providers: [ErrorBag]
})
export class CouponCreateFormComponent extends FormAbstractComponent<CouponCreateForm> implements OnInit {
  formTranslationsScope: 'test_fieldset.form';
  mainFieldSet: FormSchemeField[];
  formScheme: FormScheme = formScheme;

  @Input() data?: CouponCreateForm;
  @Input() isAdditionalForm?: boolean;

  @Output() onSubmitForm: EventEmitter<any> = new EventEmitter();

  protected formStorageKey: string = 'test_fieldset.form';
  protected additionalFieldList: string[] = ['discount_type', 'percent_off', 'amount_off', 'unit_off', 'unit_type',
    'gift_amount'];

  constructor(injector: Injector,
              protected errorBag: ErrorBag,
              private formDataService: CouponTabFormService) {
    super(injector);
  }

  onSuccess(): void {
    this.onSubmitForm.emit({ data: vaucher });
  }

  ngOnInit(): void {
    this.formDataService.submittedForm.subscribe((submittedFormEntity: boolean) => {
      if (submittedFormEntity && this.formDataService.isActiveTabForm(TypeFormEnum.VOUCHER)) {
        debugger
        this.onSubmit();
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  protected createForm(): void {
    const initialData: any = this.data || {};

    this.form = this.formBuilder.group({
      voucher_type: [initialData.type, Validators.required],
      discount_type: [initialData.type_data && initialData.type_data.discount.type, Validators.required],
      percent_off: [initialData.type_data && initialData.type_data.discount.percent_off, Validators.required],
      amount_off: [initialData.amount_off, Validators.required],
      unit_off: [initialData.unit_off, Validators.required],
      unit_type: [initialData.unit_type, Validators.required],
      category: [initialData.category, Validators.required],
      gift_amount: [initialData.gift_amount, Validators.required],
      additional_info: [initialData.additional_info, Validators.required],
      start_date: [initialData.start_date, Validators.required],
      expiration_date: [initialData.expiration_date, Validators.required],
      active_voucher: [initialData.active_voucher, Validators],
      voucher_name: [initialData.name, Validators.required],
      voucher_code: [initialData.code, Validators.required],
      redemption_quantity: [initialData.redemption, Validators.required]
    });

    this.mainFieldSet = this.formScheme.fieldsets['mainFieldSet'];
    this.changeDetectorRef.detectChanges();
  }

  protected onUpdateFormData(formValues: CouponCreateForm): void {
    this.updateFormInput(formValues);
  }

  private updateFormInput(formValues: CouponCreateForm): void {
    let inputTypeList: string[] = [];
    switch(formValues.voucher_type) {
      case VoucherTypeEnum.DISCOUNT_VOUCHER_TYPE:
        inputTypeList = ['discount_type'];
        inputTypeList = this.checkDiscountType(formValues, inputTypeList);
        break;
      case VoucherTypeEnum.GIFT_VOUCHER_TYPE:
        inputTypeList = ['gift_amount'];
        break;
    }
    this.showAdditionalFormField(inputTypeList);
  }

  private checkDiscountType(formValues: CouponCreateForm, inputTypeList: string[]): string[] {
    if (formValues.discount_type === CouponTypeDiscountEnum.PERCENTAGE) {
      inputTypeList.push('percent_off');
    } else if (formValues.discount_type === CouponTypeDiscountEnum.FIXED_AMOUNT) {
      inputTypeList.push('amount_off');
    } else if (formValues.discount_type === CouponTypeDiscountEnum.UNIT) {
      inputTypeList = [...inputTypeList, 'unit_off', 'unit_type'];
    }
    return inputTypeList;
  }

  protected showAdditionalFormField(fieldToShow: string[]): void {
    this.additionalFieldList.map(inputName => {
      if (fieldToShow.includes(inputName)) {
        this.toggleControl(inputName,true);
      } else {
        this.toggleControl(inputName,false);
      }
    });
  }
}

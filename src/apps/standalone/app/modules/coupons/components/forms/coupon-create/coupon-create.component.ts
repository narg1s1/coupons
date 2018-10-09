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
import { CouponTypeDiscountEnum, VoucherTypeEnum, CouponCreateForm, Coupon } from '../../../../shared';
import { CouponFormService } from '../../../service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'coupon-create-form',
  templateUrl: 'coupon-create.component.html',
  styleUrls: ['coupon-create.component.scss'],
  providers: [ErrorBag]
})
export class CouponCreateFormComponent extends FormAbstractComponent<CouponCreateForm> implements OnInit {
  formTranslationsScope: 'coupon_fieldset.form';
  mainFieldSet: FormSchemeField[];
  formScheme: FormScheme = formScheme;

  @Input() data?: Coupon;
  @Output() onSubmitForm: EventEmitter<any> = new EventEmitter();

  protected formStorageKey: string = 'coupon_fieldset.form';
  protected additionalFieldList: string[] = ['discount_type', 'percent_off', 'amount_off', 'unit_off', 'gift_amount',
    'gift_balance'];

  constructor(injector: Injector,
              protected errorBag: ErrorBag,
              private couponFormService: CouponFormService) {
    super(injector);
  }

  onSuccess(): void {
    this.onSubmitForm.emit(this.form.value);
  }

  ngOnInit(): void {
    this.couponFormService.submittedForm.subscribe((isSubmittedFormEntity: boolean) => {
      if (isSubmittedFormEntity) {
        this.onSubmit();
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  protected createForm(d: CouponCreateForm): void {
    const initialData: Coupon = this.data || <Coupon>{};

    this.form = this.formBuilder.group({
      type: [initialData.type, Validators.required],
      discount_type: [this.discountType(initialData), Validators.required],
      percent_off: [initialData.discount && initialData.discount.percent, Validators.required],
      amount_off: [initialData.discount && initialData.discount.amount, Validators.required],
      unit_off: [initialData.discount && initialData.discount.unit, Validators.required],
      category: [initialData.category, Validators.required],
      gift_amount: [initialData.gift && initialData.gift.amount, Validators.required],
      gift_balance: [initialData.gift && initialData.gift.balance, Validators.required],
      start_date: [initialData.start_date, Validators.required],
      expiration_date: [initialData.expiration_date, Validators.required],
      active: [initialData.active, Validators]
    });

    this.mainFieldSet = this.formScheme.fieldsets['mainFieldSet'];
    this.changeDetectorRef.detectChanges();
  }

  protected onUpdateFormData(formValues: CouponCreateForm): void {
    this.updateFormInput(formValues);
  }

  private discountType(data: Coupon) {
    return (data.discount && data.discount.type) && data.discount.type;
  }

  private updateFormInput(formValues: CouponCreateForm): void {
    let inputTypeList: string[] = [];
    switch(formValues.type) {
      case VoucherTypeEnum.DISCOUNT_VOUCHER_TYPE:
        inputTypeList = ['discount_type'];
        inputTypeList = this.checkDiscountType(formValues, inputTypeList);
        break;
      case VoucherTypeEnum.GIFT_VOUCHER_TYPE:
        inputTypeList = ['gift_amount', 'gift_balance'];
        break;
    }
    this.showAdditionalFormField(inputTypeList);
  }

  private checkDiscountType(formValues: CouponCreateForm, inputTypeList: string[]): string[] {
    if (formValues.discount_type === CouponTypeDiscountEnum.PERCENTAGE) {
      inputTypeList = [...inputTypeList, 'percent_off'];
    } else if (formValues.discount_type === CouponTypeDiscountEnum.FIXED_AMOUNT) {
      inputTypeList= [...inputTypeList, 'amount_off'];
    } else if (formValues.discount_type === CouponTypeDiscountEnum.UNIT) {
      inputTypeList = [...inputTypeList, 'unit_off'];
    }
    return inputTypeList;
  }

  private showAdditionalFormField(fieldToShow: string[]): void {
    this.additionalFieldList.map(inputName => {
      if (fieldToShow.includes(inputName)) {
        this.toggleControl(inputName,true);
      } else {
        this.toggleControl(inputName,false);
      }
    });
  }
}

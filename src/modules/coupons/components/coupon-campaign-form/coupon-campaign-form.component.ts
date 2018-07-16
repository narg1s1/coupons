import { Component, ChangeDetectionStrategy, Injector, Input, Output, EventEmitter, OnInit } from '@angular/core';
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
import { CouponTabFormService, TypeFormEnum, MockData } from '../../service';

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


interface CampaignForm {
  name: string;
  start_date: string;
  expiration_date: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'coupon-campaign-form',
  templateUrl: 'coupon-campaign-form.component.html',
  providers: [ErrorBag]
})
export class CouponCampaignFormComponent extends FormAbstractComponent<CampaignForm> implements OnInit {
  formTranslationsScope: 'test_fieldset.form';
  mainFieldSet: FormSchemeField[];
  formScheme: FormScheme = formScheme;

  @Input() data?: CouponCreateForm;

  @Output() onSubmitForm: EventEmitter<any> = new EventEmitter();

  protected formStorageKey: string = 'test_fieldset.form';

  constructor(injector: Injector,
              protected errorBag: ErrorBag,
              protected mockData: MockData,
              private formDataService: CouponTabFormService) {
    super(injector);
  }

  onSuccess(): void {
    this.mockData.save([...this.mockData.active, vaucher]);
    this.onSubmitForm.emit(vaucher);
  }

  ngOnInit(): void {
    this.formDataService.submittedForm.subscribe((submittedFormEntity: boolean) => {
      if (submittedFormEntity && this.formDataService.isActiveTabForm(TypeFormEnum.CAMPAIGN)) {
        this.onSubmit();
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  protected createForm(): void {
    const initialData: any = this.data || {};

    this.form = this.formBuilder.group({
      name: [initialData.name, Validators.required],
      start_date: [initialData.start_date, Validators.required],
      expiration_date: [initialData.expiration_date, Validators.required]
    });

    this.mainFieldSet = this.formScheme.fieldsets['mainFieldSet'];
    this.changeDetectorRef.detectChanges();
  }

  protected onUpdateFormData(formValues: CouponCreateForm): void {}
}

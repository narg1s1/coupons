import { Component, ChangeDetectionStrategy, Injector, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import {
  ErrorBag,
  FormScheme,
  FormSchemeField,
  FormAbstractComponent
} from '@pe/ng-kit/modules/form';

import { formScheme } from './coupon-campaign-form-schema';
import { CampaignForm, CouponCreateForm } from '../../../../shared';
import { CouponFormService } from '../../../service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'coupon-campaign-form',
  templateUrl: 'coupon-campaign.component.html',
  styleUrls: ['coupon-campaign.component.scss'],
  providers: [ErrorBag]
})
export class CouponCampaignFormComponent extends FormAbstractComponent<CampaignForm> implements OnInit {
  formTranslationsScope: 'campaign_fieldset.form';
  mainFieldSet: FormSchemeField[];
  formScheme: FormScheme = formScheme;

  @Input() data?: CouponCreateForm;
  @Output() onSubmitForm: EventEmitter<any> = new EventEmitter();

  protected formStorageKey: string = 'campaign_fieldset.form';

  constructor(injector: Injector,
              protected errorBag: ErrorBag,
              private formDataService: CouponFormService) {
    super(injector);
  }

  onSuccess(): void {
    // TODO: the campaign api is not ready
    // this.onSubmitForm.emit(this.form.value);
  }

  ngOnInit(): void {
    this.formDataService.submittedForm.subscribe((submittedFormEntity: boolean) => {
      if (submittedFormEntity) {
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
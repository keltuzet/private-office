import { Validators } from '@angular/forms';
import { COUNTRIES } from '@modules/contacts/const/countries.const';
import { FormlyFieldConfig } from '@ngx-formly/core';

export const CONCTACT_FIELDS_CONFIG: FormlyFieldConfig[] = [
  {
    key: 'email',
    type: 'input',
    templateOptions: {
      type: 'email',
      required: true,
      label: 'Эл. адрес',
    },
    validators: {
      validation: [Validators.email],
    },
  },
  {
    key: 'phoneNumber',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Телефонный номер',
    },
  },
  {
    key: 'address',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Адрес',
    },
  },
  {
    key: 'country',
    type: 'select',
    templateOptions: {
      label: 'Страна',
      options: COUNTRIES,
      valueProp: 'country',
      labelProp: 'country',
    },
  },
];

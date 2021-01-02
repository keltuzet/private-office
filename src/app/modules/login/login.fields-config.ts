import { Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

export const LOGIN_FIELDS_CONFIG: FormlyFieldConfig[] = [
  {
    key: 'email',
    type: 'input',
    templateOptions: {
      label: 'Ваше имя',
      required: true,
      attributes: {
        autocomplete: 'off',
      },
    },
    validators: {
      validation: [Validators.email],
    },
  },
  {
    key: 'password',
    type: 'input',
    templateOptions: {
      type: 'password',
      label: 'Ваш пароль',
      required: true,
      minLength: 6,
      attributes: {
        autocomplete: 'off',
      },
    },
  },
];

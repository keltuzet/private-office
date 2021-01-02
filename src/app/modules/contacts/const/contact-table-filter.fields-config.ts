import { FormlyFieldConfig } from '@ngx-formly/core';

export const CONCTACT_TABLE_FILTER_FIELDS_CONFIG: FormlyFieldConfig[] = [
  {
    key: 'searchByEmail',
    type: 'input',
    templateOptions: {
      label: 'Поиск по эл. адресу',
    },
  },
  {
    key: 'searchByPhoneNumber',
    type: 'input',
    templateOptions: {
      label: 'Поиск по телефонному номеру',
    },
  },
  {
    key: 'searchByAddress',
    type: 'input',
    templateOptions: {
      label: 'Поиск по адресу',
    },
  },
];

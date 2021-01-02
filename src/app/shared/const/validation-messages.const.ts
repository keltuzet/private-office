import { ValidationMessageOption } from '@ngx-formly/core/lib/services/formly.config';

export const VALIDATION_MESSAGES: ValidationMessageOption[] = [
  { name: 'required', message: 'Это поле объязательное' },
  { name: 'email', message: 'Неправильный эл. адрес' },
  { name: 'minlength', message: (err) => `Минимум ${err.requiredLength} символов` },
];

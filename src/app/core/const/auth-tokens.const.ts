import { InjectionToken } from '@angular/core';

import { Token } from '@core/models';

export const AUTH_KEYS_TOKEN = new InjectionToken<Token>('AUTH_KEYS');
export const UNATHORIZED_STATUSES_TOKEN = new InjectionToken<number[]>('UNATHORIZED_STATUSES');

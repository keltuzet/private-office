import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthModule as NgxAuthModule, AUTH_SERVICE, PROTECTED_FALLBACK_PAGE_URI, PUBLIC_FALLBACK_PAGE_URI } from 'ngx-auth';
import { FormlyModule } from '@ngx-formly/core';

import { AUTH_KEYS, AUTH_KEYS_TOKEN, UNATHORIZED_STATUSES, UNATHORIZED_STATUSES_TOKEN } from '@core/const';
import { API_URL, AuthenticationService } from '@core/services';
import { environment } from '@environments/environment';
import { APP_ROUTES, VALIDATION_MESSAGES } from '@shared/const';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    NgxAuthModule,
    HttpClientModule,
    RouterModule,
    FormlyModule.forRoot({
      extras: { lazyRender: true },
      validationMessages: VALIDATION_MESSAGES,
    }),
    MatSnackBarModule,
  ],
  providers: [
    { provide: UNATHORIZED_STATUSES_TOKEN, useValue: UNATHORIZED_STATUSES },
    {
      provide: AUTH_KEYS_TOKEN,
      useValue: {
        refreshToken: AUTH_KEYS.refresh,
        accessToken: AUTH_KEYS.access,
      },
    },
    { provide: API_URL, useValue: environment.api },
    { provide: AUTH_SERVICE, useClass: AuthenticationService },
    { provide: PROTECTED_FALLBACK_PAGE_URI, useValue: APP_ROUTES.contacts },
    { provide: PUBLIC_FALLBACK_PAGE_URI, useValue: APP_ROUTES.login },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

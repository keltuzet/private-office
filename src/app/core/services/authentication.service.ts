import { Inject, Injectable, Injector } from '@angular/core';
import { AuthService } from 'ngx-auth';

import { AUTH_KEYS_TOKEN, UNATHORIZED_STATUSES_TOKEN } from '@core/const';
import { Login, Token } from '@core/models';
import { BaseHttpService } from './base-http.service';
import { Observable, of, throwError } from 'rxjs';
import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { MockLogin } from '@core/mocks/login.model.mock';
import { SPINNER_NAMES } from '@shared/const';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends BaseHttpService implements AuthService {
  private skipUrls = ['authorization'];
  private interruptedUrl: string;

  private get storage(): Storage {
    return localStorage;
  }

  constructor(
    injector: Injector,
    @Inject(AUTH_KEYS_TOKEN) private readonly authKeys: Token,
    @Inject(UNATHORIZED_STATUSES_TOKEN) private readonly unathorizedStatuses: number[],
  ) {
    super(injector);
  }

  public isAuthorized(): Observable<boolean> {
    return this.getAccessToken().pipe(switchMap((token) => of(!!token)));
  }

  public getAccessToken(): Observable<string> {
    return of(this.storage.getItem(this.authKeys.accessToken));
  }

  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    const { status } = response;
    return this.unathorizedStatuses.includes(status);
  }

  public skipRequest?(request: HttpRequest<any>): boolean {
    return this.skipUrls.some((skipUrl) => request.url.includes(skipUrl));
  }

  public verifyTokenRequest?(url: string): boolean {
    return url.includes('/authorization');
  }

  public refreshToken(): Observable<any> {
    const accessToken = this.storage.getItem(this.authKeys.accessToken);
    const refreshToken = this.storage.getItem(this.authKeys.refreshToken);

    return of({ accessToken, refreshToken });
  }

  public login(login: Login): Observable<Token> {
    return this.post<Token>('login', login, {
      spinnerName: SPINNER_NAMES.LOGIN_FORM,
    }).pipe(
      tap((token) => {
        this.saveAccessData(token);
      }),
    );

    // if (this.checkLogin(login)) {
    //   return this.loadingWrapper(
    //     // Emmiting backend success response
    //     of({
    //       accessToken: 'accessToken',
    //       refreshToken: 'refreshToken',
    //     }).pipe(
    //       tap((token) => {
    //         this.saveAccessData(token);
    //       }),
    //     ),
    //     SPINNER_NAMES.LOGIN_FORM,
    //   );
    // } else {
    //   // Emmiting backend error response
    //   throw throwError(
    //     new HttpErrorResponse({
    //       error: {
    //         message: 'Такого пользователя не существует',
    //       },
    //       status: 401,
    //     }),
    //   );
    // }
  }

  public setInterruptedUrl(url: string): void {
    this.interruptedUrl = url;
  }

  public getInterruptedUrl(): string {
    return this.interruptedUrl;
  }

  private saveAccessData(token: Token): void {
    this.storage.setItem(this.authKeys.accessToken, token.accessToken);
    this.storage.setItem(this.authKeys.refreshToken, token.refreshToken);
  }
}

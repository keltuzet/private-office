import { HttpClient } from '@angular/common/http';
import { InjectionToken, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';

import { DeleteHttpOptions, GetHttpOptions, PostHttpOptions, PutHttpOptions } from '@core/models';

export const API_URL = new InjectionToken<string>('API_URL');

export class BaseHttpService {
  private http: HttpClient;
  private url: string;
  private spinner: NgxSpinnerService;

  protected get apiUrl(): string {
    if (!this.url) {
      throw Error('Set "URL" for API requests in your config!');
    }

    return this.url;
  }
  protected set apiUrl(url: string) {
    this.url = url;
  }

  constructor(private injector: Injector) {
    this.url = this.injector.get(API_URL);
    this.http = this.injector.get(HttpClient);
    this.spinner = this.injector.get(NgxSpinnerService);
  }

  protected get<T>(urlPathname: string, httpOptions: GetHttpOptions = {}): Observable<T> {
    const { id } = httpOptions;
    const requestUrl = `${this.apiUrl}/${urlPathname}${id ? `/${id}` : ''}`;

    return this.wrapWithSpinnerStream(this.http.get<T>(requestUrl, httpOptions), httpOptions.spinnerName);
  }

  protected post<T>(urlPathname: string, body: any | null, httpOptions: PostHttpOptions = {}): Observable<T> {
    const { id } = httpOptions;
    const requestUrl = `${this.apiUrl}/${urlPathname}${id ? `/${id}` : ''}`;

    return this.wrapWithSpinnerStream(this.http.post<T>(requestUrl, body, httpOptions), httpOptions.spinnerName);
  }

  protected put<T>(urlPathname: string, body: any | null, httpOptions: PutHttpOptions = {}): Observable<T> {
    const { id } = httpOptions;
    const requestUrl = `${this.apiUrl}/${urlPathname}${id ? `/${id}` : ''}`;

    return this.wrapWithSpinnerStream(this.http.put<T>(requestUrl, body, httpOptions), httpOptions.spinnerName);
  }

  protected delete<T>(urlPathname: string, httpOptions: DeleteHttpOptions = {}): Observable<T> {
    const { id } = httpOptions;
    const requestUrl = `${this.apiUrl}/${urlPathname}${id ? `/${id}` : ''}`;

    return this.wrapWithSpinnerStream(this.http.delete<T>(requestUrl, httpOptions), httpOptions.spinnerName);
  }

  protected wrapWithSpinnerStream<T>(stream$: Observable<T>, spinnerName?: string): Observable<T> {
    return spinnerName ? this.addSpinnerStream<T>(stream$, spinnerName) : stream$;
  }

  protected addSpinnerStream<T>(stream$: Observable<T>, spinnerName: string, options?: Spinner): Observable<T> {
    const mergedOptions = Object.assign(
      {
        zIndex: 1,
        fullScreen: false,
      },
      options || {},
    );

    this.spinner.show(spinnerName, mergedOptions);
    return stream$.pipe(finalize(() => this.spinner.hide(spinnerName, 500)));
  }
}

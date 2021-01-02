import { HttpHeaders, HttpParams } from '@angular/common/http';
import { StringableOptionalIdentification } from './identification.model';

export interface HttpParamsObjectModel {
  [param: string]: string | string[];
}

export interface HttpHeadersObjectModel {
  [header: string]: string | string[];
}

type CommonHttpParams = HttpParams | HttpParamsObjectModel;
type CommonHttpHeaders = HttpHeaders | HttpHeadersObjectModel;

export interface CommonHttpOptions {
  headers?: CommonHttpHeaders;
  params?: CommonHttpParams;
  observe?: 'body';
  responseType?: 'json';
  reportProgress?: boolean;
  withCredentials?: boolean;
  spinnerName?: string;
}

export interface GetHttpOptions extends CommonHttpOptions, StringableOptionalIdentification {}
export interface PostHttpOptions extends CommonHttpOptions, StringableOptionalIdentification {}
export interface PutHttpOptions extends CommonHttpOptions, StringableOptionalIdentification {}
export interface DeleteHttpOptions extends CommonHttpOptions, StringableOptionalIdentification {}

import { Injectable, InjectionToken, Injector } from '@angular/core';

import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

import { map, Observable } from 'rxjs';

export interface IRequest<T> {
  data: T;
}

export interface IOption {
  body?: any;
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  context?: HttpContext;
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  responseType?: 'json';
  reportProgress?: boolean;
  withCredentials?: boolean;
}

export interface INgxUploadImageConfig {
  url: string;
  method: 'post' | 'put';
  token?: string;
}

export interface IFile {
  file: File;
}

export interface INgxUploadImageResponse {
  url: string;
}

export type NgxUploadImagePayload = INgxUploadImageConfig & IFile;

export interface INgxUploadImage {
  uploadImage(
    payload: NgxUploadImagePayload
  ): Observable<INgxUploadImageResponse>;
}

export const NGX_UPLOAD_IMAGE_TOKEN = new InjectionToken<INgxUploadImage>(
  'NgxUploadImage'
);

@Injectable({
  providedIn: 'root',
})
export class NgxUploadImageService implements INgxUploadImage {
  constructor(private injector: Injector) {}

  uploadImage({
    method,
    url,
    token,
    file,
  }: NgxUploadImagePayload): Observable<INgxUploadImageResponse> {
    const formData = new FormData();
    formData.append('media_file', file);

    const headers = new HttpHeaders().set('access', token);

    const option: IOption = {
      body: formData,
      headers,
    };

    const http = this.injector.get(HttpClient);

    return http
      .request<IRequest<INgxUploadImageResponse>>(method, url, option)
      .pipe(map((response) => response.data));
  }
}

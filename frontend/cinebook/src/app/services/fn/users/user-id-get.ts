/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserResponse } from '../../models/user-response';

export interface UserIdGet$Params {

/**
 * ID of the user
 */
  id: any;
}

export function userIdGet(http: HttpClient, rootUrl: string, params: UserIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<UserResponse>> {
  const rb = new RequestBuilder(rootUrl, userIdGet.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserResponse>;
    })
  );
}

userIdGet.PATH = '/user/{id}';

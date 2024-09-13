/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Screen } from '../../models/screen';

export interface ScreenIdGet$Params {

/**
 * ID of the screen
 */
  id: any;
}

export function screenIdGet(http: HttpClient, rootUrl: string, params: ScreenIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Screen>> {
  const rb = new RequestBuilder(rootUrl, screenIdGet.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Screen>;
    })
  );
}

screenIdGet.PATH = '/screen/{id}';

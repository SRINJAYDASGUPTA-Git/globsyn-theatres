/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Schedule } from '../../models/schedule';

export interface ScheduleIdGet$Params {

/**
 * ID of the schedule
 */
  id: any;
}

export function scheduleIdGet(http: HttpClient, rootUrl: string, params: ScheduleIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Schedule>> {
  const rb = new RequestBuilder(rootUrl, scheduleIdGet.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Schedule>;
    })
  );
}

scheduleIdGet.PATH = '/schedule/{id}';

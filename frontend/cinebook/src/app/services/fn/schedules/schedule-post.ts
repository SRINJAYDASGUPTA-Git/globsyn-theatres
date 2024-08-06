/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Schedule } from '../../models/schedule';

export interface SchedulePost$Params {
      body: Schedule
}

export function schedulePost(http: HttpClient, rootUrl: string, params: SchedulePost$Params, context?: HttpContext): Observable<StrictHttpResponse<Schedule>> {
  const rb = new RequestBuilder(rootUrl, schedulePost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
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

schedulePost.PATH = '/schedule';

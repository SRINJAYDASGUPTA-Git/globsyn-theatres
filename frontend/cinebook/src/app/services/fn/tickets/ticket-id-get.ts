/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TicketResponse } from '../../models/ticket-response';

export interface TicketIdGet$Params {

/**
 * ID of the ticket
 */
  id: any;
}

export function ticketIdGet(http: HttpClient, rootUrl: string, params: TicketIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<TicketResponse>> {
  const rb = new RequestBuilder(rootUrl, ticketIdGet.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<TicketResponse>;
    })
  );
}

ticketIdGet.PATH = '/ticket/{id}';

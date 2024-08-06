/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TicketResponse } from '../../models/ticket-response';

export interface TicketGet$Params {
}

export function ticketGet(http: HttpClient, rootUrl: string, params?: TicketGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TicketResponse>>> {
  const rb = new RequestBuilder(rootUrl, ticketGet.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<TicketResponse>>;
    })
  );
}

ticketGet.PATH = '/ticket';

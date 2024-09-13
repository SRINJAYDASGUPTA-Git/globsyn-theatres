/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TicketRequest } from '../../models/ticket-request';
import { TicketResponse } from '../../models/ticket-response';

export interface TicketIdPut$Params {

/**
 * ID of the ticket
 */
  id: any;
      body: TicketRequest
}

export function ticketIdPut(http: HttpClient, rootUrl: string, params: TicketIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<TicketResponse>> {
  const rb = new RequestBuilder(rootUrl, ticketIdPut.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
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

ticketIdPut.PATH = '/ticket/{id}';

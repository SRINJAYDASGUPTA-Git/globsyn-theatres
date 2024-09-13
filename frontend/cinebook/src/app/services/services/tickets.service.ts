/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { ticketGet } from '../fn/tickets/ticket-get';
import { TicketGet$Params } from '../fn/tickets/ticket-get';
import { ticketIdDelete } from '../fn/tickets/ticket-id-delete';
import { TicketIdDelete$Params } from '../fn/tickets/ticket-id-delete';
import { ticketIdGet } from '../fn/tickets/ticket-id-get';
import { TicketIdGet$Params } from '../fn/tickets/ticket-id-get';
import { ticketIdPut } from '../fn/tickets/ticket-id-put';
import { TicketIdPut$Params } from '../fn/tickets/ticket-id-put';
import { ticketPost } from '../fn/tickets/ticket-post';
import { TicketPost$Params } from '../fn/tickets/ticket-post';
import { TicketResponse } from '../models/ticket-response';


/**
 * API for tickets in the system
 */
@Injectable({ providedIn: 'root' })
export class TicketsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `ticketGet()` */
  static readonly TicketGetPath = '/ticket';

  /**
   * Retrieve a list of tickets from the database.
   *
   * Get a list of all tickets
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `ticketGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  ticketGet$Response(params?: TicketGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TicketResponse>>> {
    return ticketGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Retrieve a list of tickets from the database.
   *
   * Get a list of all tickets
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `ticketGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  ticketGet(params?: TicketGet$Params, context?: HttpContext): Observable<Array<TicketResponse>> {
    return this.ticketGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<TicketResponse>>): Array<TicketResponse> => r.body)
    );
  }

  /** Path part for operation `ticketPost()` */
  static readonly TicketPostPath = '/ticket';

  /**
   * Add a new ticket to the database.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `ticketPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  ticketPost$Response(params: TicketPost$Params, context?: HttpContext): Observable<StrictHttpResponse<TicketResponse>> {
    return ticketPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Add a new ticket to the database.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `ticketPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  ticketPost(params: TicketPost$Params, context?: HttpContext): Observable<TicketResponse> {
    return this.ticketPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<TicketResponse>): TicketResponse => r.body)
    );
  }

  /** Path part for operation `ticketIdGet()` */
  static readonly TicketIdGetPath = '/ticket/{id}';

  /**
   * Retrieve a ticket by ID.
   *
   * Retrieve a ticket from the database by its ID
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `ticketIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  ticketIdGet$Response(params: TicketIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<TicketResponse>> {
    return ticketIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Retrieve a ticket by ID.
   *
   * Retrieve a ticket from the database by its ID
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `ticketIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  ticketIdGet(params: TicketIdGet$Params, context?: HttpContext): Observable<TicketResponse> {
    return this.ticketIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<TicketResponse>): TicketResponse => r.body)
    );
  }

  /** Path part for operation `ticketIdPut()` */
  static readonly TicketIdPutPath = '/ticket/{id}';

  /**
   * Update a ticket by ID.
   *
   * Update a ticket by ID
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `ticketIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  ticketIdPut$Response(params: TicketIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<TicketResponse>> {
    return ticketIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Update a ticket by ID.
   *
   * Update a ticket by ID
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `ticketIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  ticketIdPut(params: TicketIdPut$Params, context?: HttpContext): Observable<TicketResponse> {
    return this.ticketIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<TicketResponse>): TicketResponse => r.body)
    );
  }

  /** Path part for operation `ticketIdDelete()` */
  static readonly TicketIdDeletePath = '/ticket/{id}';

  /**
   * Delete a ticket by ID.
   *
   * Delete a ticket by ID
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `ticketIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  ticketIdDelete$Response(params: TicketIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return ticketIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete a ticket by ID.
   *
   * Delete a ticket by ID
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `ticketIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  ticketIdDelete(params: TicketIdDelete$Params, context?: HttpContext): Observable<void> {
    return this.ticketIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}

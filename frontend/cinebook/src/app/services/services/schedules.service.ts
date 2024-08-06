/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Schedule } from '../models/schedule';
import { scheduleGet } from '../fn/schedules/schedule-get';
import { ScheduleGet$Params } from '../fn/schedules/schedule-get';
import { scheduleIdDelete } from '../fn/schedules/schedule-id-delete';
import { ScheduleIdDelete$Params } from '../fn/schedules/schedule-id-delete';
import { scheduleIdGet } from '../fn/schedules/schedule-id-get';
import { ScheduleIdGet$Params } from '../fn/schedules/schedule-id-get';
import { scheduleIdPut } from '../fn/schedules/schedule-id-put';
import { ScheduleIdPut$Params } from '../fn/schedules/schedule-id-put';
import { schedulePost } from '../fn/schedules/schedule-post';
import { SchedulePost$Params } from '../fn/schedules/schedule-post';


/**
 * API for managing movie schedules
 */
@Injectable({ providedIn: 'root' })
export class SchedulesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `scheduleGet()` */
  static readonly ScheduleGetPath = '/schedule';

  /**
   * Retrieve a list of schedules from the database.
   *
   * Get a list of all schedules
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `scheduleGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  scheduleGet$Response(params?: ScheduleGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Schedule>>> {
    return scheduleGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Retrieve a list of schedules from the database.
   *
   * Get a list of all schedules
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `scheduleGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  scheduleGet(params?: ScheduleGet$Params, context?: HttpContext): Observable<Array<Schedule>> {
    return this.scheduleGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Schedule>>): Array<Schedule> => r.body)
    );
  }

  /** Path part for operation `schedulePost()` */
  static readonly SchedulePostPath = '/schedule';

  /**
   * Add a new schedule to the database.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `schedulePost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  schedulePost$Response(params: SchedulePost$Params, context?: HttpContext): Observable<StrictHttpResponse<Schedule>> {
    return schedulePost(this.http, this.rootUrl, params, context);
  }

  /**
   * Add a new schedule to the database.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `schedulePost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  schedulePost(params: SchedulePost$Params, context?: HttpContext): Observable<Schedule> {
    return this.schedulePost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Schedule>): Schedule => r.body)
    );
  }

  /** Path part for operation `scheduleIdGet()` */
  static readonly ScheduleIdGetPath = '/schedule/{id}';

  /**
   * Retrieve a schedule by ID.
   *
   * Retrieve a specific schedule by ID
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `scheduleIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  scheduleIdGet$Response(params: ScheduleIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Schedule>> {
    return scheduleIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Retrieve a schedule by ID.
   *
   * Retrieve a specific schedule by ID
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `scheduleIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  scheduleIdGet(params: ScheduleIdGet$Params, context?: HttpContext): Observable<Schedule> {
    return this.scheduleIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Schedule>): Schedule => r.body)
    );
  }

  /** Path part for operation `scheduleIdPut()` */
  static readonly ScheduleIdPutPath = '/schedule/{id}';

  /**
   * Update a schedule by ID.
   *
   * Update a schedule by ID
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `scheduleIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  scheduleIdPut$Response(params: ScheduleIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<Schedule>> {
    return scheduleIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Update a schedule by ID.
   *
   * Update a schedule by ID
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `scheduleIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  scheduleIdPut(params: ScheduleIdPut$Params, context?: HttpContext): Observable<Schedule> {
    return this.scheduleIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<Schedule>): Schedule => r.body)
    );
  }

  /** Path part for operation `scheduleIdDelete()` */
  static readonly ScheduleIdDeletePath = '/schedule/{id}';

  /**
   * Delete a schedule by ID.
   *
   * Delete a schedule by ID
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `scheduleIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  scheduleIdDelete$Response(params: ScheduleIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return scheduleIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete a schedule by ID.
   *
   * Delete a schedule by ID
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `scheduleIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  scheduleIdDelete(params: ScheduleIdDelete$Params, context?: HttpContext): Observable<void> {
    return this.scheduleIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}

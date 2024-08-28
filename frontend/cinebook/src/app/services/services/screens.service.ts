/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Screen } from '../models/screen';
import { screenGet } from '../fn/screens/screen-get';
import { ScreenGet$Params } from '../fn/screens/screen-get';
import { screenIdDelete } from '../fn/screens/screen-id-delete';
import { ScreenIdDelete$Params } from '../fn/screens/screen-id-delete';
import { screenIdGet } from '../fn/screens/screen-id-get';
import { ScreenIdGet$Params } from '../fn/screens/screen-id-get';
import { screenIdPut } from '../fn/screens/screen-id-put';
import { ScreenIdPut$Params } from '../fn/screens/screen-id-put';
import { screenPost } from '../fn/screens/screen-post';
import { ScreenPost$Params } from '../fn/screens/screen-post';


/**
 * API for managing movie screens
 */
@Injectable({ providedIn: 'root' })
export class ScreensService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `screenGet()` */
  static readonly ScreenGetPath = '/screen';

  /**
   * Retrieve a list of screens from the database.
   *
   * Get a list of all screens
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `screenGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  screenGet$Response(params?: ScreenGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Screen>>> {
    return screenGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Retrieve a list of screens from the database.
   *
   * Get a list of all screens
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `screenGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  screenGet(params?: ScreenGet$Params, context?: HttpContext): Observable<Array<Screen>> {
    return this.screenGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Screen>>): Array<Screen> => r.body)
    );
  }

  /** Path part for operation `screenPost()` */
  static readonly ScreenPostPath = '/screen';

  /**
   * Add a new screen to the database.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `screenPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  screenPost$Response(params: ScreenPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Screen>> {
    return screenPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Add a new screen to the database.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `screenPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  screenPost(params: ScreenPost$Params, context?: HttpContext): Observable<Screen> {
    return this.screenPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Screen>): Screen => r.body)
    );
  }

  /** Path part for operation `screenIdGet()` */
  static readonly ScreenIdGetPath = '/screen/{id}';

  /**
   * Retrieve a screen by ID.
   *
   * Retrieve a specific screen by ID
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `screenIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  screenIdGet$Response(params: ScreenIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Screen>> {
    return screenIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Retrieve a screen by ID.
   *
   * Retrieve a specific screen by ID
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `screenIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  screenIdGet(params: ScreenIdGet$Params, context?: HttpContext): Observable<Screen> {
    return this.screenIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Screen>): Screen => r.body)
    );
  }

  /** Path part for operation `screenIdPut()` */
  static readonly ScreenIdPutPath = '/screen/{id}';

  /**
   * Update a screen by ID.
   *
   * Update a screen by ID
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `screenIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  screenIdPut$Response(params: ScreenIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<Screen>> {
    return screenIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Update a screen by ID.
   *
   * Update a screen by ID
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `screenIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  screenIdPut(params: ScreenIdPut$Params, context?: HttpContext): Observable<Screen> {
    return this.screenIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<Screen>): Screen => r.body)
    );
  }

  /** Path part for operation `screenIdDelete()` */
  static readonly ScreenIdDeletePath = '/screen/{id}';

  /**
   * Delete a screen by ID.
   *
   * Delete a screen by ID
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `screenIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  screenIdDelete$Response(params: ScreenIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return screenIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete a screen by ID.
   *
   * Delete a screen by ID
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `screenIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  screenIdDelete(params: ScreenIdDelete$Params, context?: HttpContext): Observable<void> {
    return this.screenIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}

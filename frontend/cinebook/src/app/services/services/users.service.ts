/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { userGet } from '../fn/users/user-get';
import { UserGet$Params } from '../fn/users/user-get';
import { userIdDelete } from '../fn/users/user-id-delete';
import { UserIdDelete$Params } from '../fn/users/user-id-delete';
import { userIdGet } from '../fn/users/user-id-get';
import { UserIdGet$Params } from '../fn/users/user-id-get';
import { userIdPut } from '../fn/users/user-id-put';
import { UserIdPut$Params } from '../fn/users/user-id-put';
import { userPost } from '../fn/users/user-post';
import { UserPost$Params } from '../fn/users/user-post';
import { UserResponse } from '../models/user-response';


/**
 * API for users in the system
 */
@Injectable({ providedIn: 'root' })
export class UsersService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `userGet()` */
  static readonly UserGetPath = '/user';

  /**
   * Retrieve a list of users from the database.
   *
   * Get a list of all users
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  userGet$Response(params?: UserGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserResponse>>> {
    return userGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Retrieve a list of users from the database.
   *
   * Get a list of all users
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userGet(params?: UserGet$Params, context?: HttpContext): Observable<Array<UserResponse>> {
    return this.userGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserResponse>>): Array<UserResponse> => r.body)
    );
  }

  /** Path part for operation `userPost()` */
  static readonly UserPostPath = '/user';

  /**
   * Add a new user to the database.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userPost$Response(params: UserPost$Params, context?: HttpContext): Observable<StrictHttpResponse<UserResponse>> {
    return userPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Add a new user to the database.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userPost(params: UserPost$Params, context?: HttpContext): Observable<UserResponse> {
    return this.userPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserResponse>): UserResponse => r.body)
    );
  }

  /** Path part for operation `userIdGet()` */
  static readonly UserIdGetPath = '/user/{id}';

  /**
   * Retrieve a user by ID.
   *
   * Retrieve a list of users from the database
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  userIdGet$Response(params: UserIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<UserResponse>> {
    return userIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Retrieve a user by ID.
   *
   * Retrieve a list of users from the database
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userIdGet(params: UserIdGet$Params, context?: HttpContext): Observable<UserResponse> {
    return this.userIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserResponse>): UserResponse => r.body)
    );
  }

  /** Path part for operation `userIdPut()` */
  static readonly UserIdPutPath = '/user/{id}';

  /**
   * Update a user by ID.
   *
   * Update an user by ID
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userIdPut$Response(params: UserIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<UserResponse>> {
    return userIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Update a user by ID.
   *
   * Update an user by ID
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userIdPut(params: UserIdPut$Params, context?: HttpContext): Observable<UserResponse> {
    return this.userIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserResponse>): UserResponse => r.body)
    );
  }

  /** Path part for operation `userIdDelete()` */
  static readonly UserIdDeletePath = '/user/{id}';

  /**
   * Delete an user by ID.
   *
   * Delete a movie by ID
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  userIdDelete$Response(params: UserIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return userIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete an user by ID.
   *
   * Delete a movie by ID
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userIdDelete(params: UserIdDelete$Params, context?: HttpContext): Observable<void> {
    return this.userIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}

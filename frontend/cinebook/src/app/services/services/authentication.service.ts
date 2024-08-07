/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { AuthenticationResponse } from '../models/authentication-response';
import { authLoginPost } from '../fn/authentication/auth-login-post';
import { AuthLoginPost$Params } from '../fn/authentication/auth-login-post';
import { authRegisterPost } from '../fn/authentication/auth-register-post';
import { AuthRegisterPost$Params } from '../fn/authentication/auth-register-post';


/**
 * APIs for user authentication
 */
@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `authRegisterPost()` */
  static readonly AuthRegisterPostPath = '/auth/register';

  /**
   * Register a new user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authRegisterPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authRegisterPost$Response(params: AuthRegisterPost$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
    return authRegisterPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Register a new user.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authRegisterPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authRegisterPost(params: AuthRegisterPost$Params, context?: HttpContext): Observable<AuthenticationResponse> {
    return this.authRegisterPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthenticationResponse>): AuthenticationResponse => r.body)
    );
  }

  /** Path part for operation `authLoginPost()` */
  static readonly AuthLoginPostPath = '/auth/login';

  /**
   * Login a user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authLoginPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authLoginPost$Response(params: AuthLoginPost$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
    return authLoginPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Login a user.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authLoginPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authLoginPost(params: AuthLoginPost$Params, context?: HttpContext): Observable<AuthenticationResponse> {
    return this.authLoginPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthenticationResponse>): AuthenticationResponse => r.body)
    );
  }

}

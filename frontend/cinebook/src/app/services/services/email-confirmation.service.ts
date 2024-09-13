/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { emailSendEmailPost } from '../fn/email-confirmation/email-send-email-post';
import { EmailSendEmailPost$Params } from '../fn/email-confirmation/email-send-email-post';


/**
 * Send email confirmation to the user after booking tickets
 */
@Injectable({ providedIn: 'root' })
export class EmailConfirmationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `emailSendEmailPost()` */
  static readonly EmailSendEmailPostPath = '/email/send-email';

  /**
   * Send a booking confirmation email to the user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `emailSendEmailPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  emailSendEmailPost$Response(params: EmailSendEmailPost$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'message'?: string;
}>> {
    return emailSendEmailPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Send a booking confirmation email to the user.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `emailSendEmailPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  emailSendEmailPost(params: EmailSendEmailPost$Params, context?: HttpContext): Observable<{
'message'?: string;
}> {
    return this.emailSendEmailPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'message'?: string;
}>): {
'message'?: string;
} => r.body)
    );
  }

}

/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Movie } from '../../models/movie';

export interface MoviePost$Params {
      body: Movie
}

export function moviePost(http: HttpClient, rootUrl: string, params: MoviePost$Params, context?: HttpContext): Observable<StrictHttpResponse<Movie>> {
  const rb = new RequestBuilder(rootUrl, moviePost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Movie>;
    })
  );
}

moviePost.PATH = '/movie';

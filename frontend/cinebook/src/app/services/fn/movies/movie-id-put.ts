/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Movie } from '../../models/movie';

export interface MovieIdPut$Params {

/**
 * ID of the movie
 */
  id: string;
      body: Movie
}

export function movieIdPut(http: HttpClient, rootUrl: string, params: MovieIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<Movie>> {
  const rb = new RequestBuilder(rootUrl, movieIdPut.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
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

movieIdPut.PATH = '/movie/{id}';

/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Movie } from '../models/movie';
import { movieGet } from '../fn/movies/movie-get';
import { MovieGet$Params } from '../fn/movies/movie-get';
import { movieIdDelete } from '../fn/movies/movie-id-delete';
import { MovieIdDelete$Params } from '../fn/movies/movie-id-delete';
import { movieIdGet } from '../fn/movies/movie-id-get';
import { MovieIdGet$Params } from '../fn/movies/movie-id-get';
import { movieIdPut } from '../fn/movies/movie-id-put';
import { MovieIdPut$Params } from '../fn/movies/movie-id-put';
import { moviePost } from '../fn/movies/movie-post';
import { MoviePost$Params } from '../fn/movies/movie-post';


/**
 * API for movies in the database
 */
@Injectable({ providedIn: 'root' })
export class MoviesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `movieGet()` */
  static readonly MovieGetPath = '/movie';

  /**
   * Retrieve a list of movies.
   *
   * Retrieve a list of movies from the database
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `movieGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  movieGet$Response(params?: MovieGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Movie>>> {
    return movieGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Retrieve a list of movies.
   *
   * Retrieve a list of movies from the database
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `movieGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  movieGet(params?: MovieGet$Params, context?: HttpContext): Observable<Array<Movie>> {
    return this.movieGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Movie>>): Array<Movie> => r.body)
    );
  }

  /** Path part for operation `moviePost()` */
  static readonly MoviePostPath = '/movie';

  /**
   * Add a new movie to the database.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `moviePost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  moviePost$Response(params: MoviePost$Params, context?: HttpContext): Observable<StrictHttpResponse<Movie>> {
    return moviePost(this.http, this.rootUrl, params, context);
  }

  /**
   * Add a new movie to the database.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `moviePost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  moviePost(params: MoviePost$Params, context?: HttpContext): Observable<Movie> {
    return this.moviePost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Movie>): Movie => r.body)
    );
  }

  /** Path part for operation `movieIdGet()` */
  static readonly MovieIdGetPath = '/movie/{id}';

  /**
   * Retrieve a movie by ID.
   *
   * Retrieve a list of movies from the database
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `movieIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  movieIdGet$Response(params: MovieIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Movie>> {
    return movieIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Retrieve a movie by ID.
   *
   * Retrieve a list of movies from the database
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `movieIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  movieIdGet(params: MovieIdGet$Params, context?: HttpContext): Observable<Movie> {
    return this.movieIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Movie>): Movie => r.body)
    );
  }

  /** Path part for operation `movieIdPut()` */
  static readonly MovieIdPutPath = '/movie/{id}';

  /**
   * Update a movie by ID.
   *
   * Update a movie by ID
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `movieIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  movieIdPut$Response(params: MovieIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<Movie>> {
    return movieIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Update a movie by ID.
   *
   * Update a movie by ID
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `movieIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  movieIdPut(params: MovieIdPut$Params, context?: HttpContext): Observable<Movie> {
    return this.movieIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<Movie>): Movie => r.body)
    );
  }

  /** Path part for operation `movieIdDelete()` */
  static readonly MovieIdDeletePath = '/movie/{id}';

  /**
   * Delete a movie by ID.
   *
   * Delete a movie by ID
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `movieIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  movieIdDelete$Response(params: MovieIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return movieIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete a movie by ID.
   *
   * Delete a movie by ID
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `movieIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  movieIdDelete(params: MovieIdDelete$Params, context?: HttpContext): Observable<void> {
    return this.movieIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}

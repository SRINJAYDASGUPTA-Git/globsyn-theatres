/* tslint:disable */
/* eslint-disable */
export interface Movie {

  /**
   * Cast of the movie
   */
  cast: Array<string>;

  /**
   * Director of the movie
   */
  director: string;

  /**
   * Duration of the movie in minutes
   */
  duration: number;

  /**
   * Genre of the movie
   */
  genre: string;

  /**
   * Auto-generated unique identifier
   */
  _id?: string;

  /**
   * IMDb rating of the movie
   */
  imdb_rating: number;

  /**
   * Language of the movie
   */
  language: string;

  /**
   * Name of the movie
   */
  name: string;

  /**
   * URL of the movie poster
   */
  poster: string;

  /**
   * Release date of the movie
   */
  rel_date: string;
}

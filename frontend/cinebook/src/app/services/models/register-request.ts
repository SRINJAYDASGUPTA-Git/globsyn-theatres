/* tslint:disable */
/* eslint-disable */
export interface RegisterRequest {
  /**
   * Email of the user
   */
  email: string;

  /**
   * Name of the user
   */
  name: string;

  /**
   * Password of the user
   */
  password: string;

  /**
   * Phone number of the user
   */
  phone: string;

  tickets: Array<string>;
}

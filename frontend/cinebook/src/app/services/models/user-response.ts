/* tslint:disable */
/* eslint-disable */
export interface UserResponse {

  /**
   * Email of the user
   */
  email: string;

  /**
   * Auto-generated unique identifier
   */
  _id?: string;

  /**
   * Name of the user
   */
  name: string;

  /**
   * Hashed Password of the user
   */
  password: string;

  /**
   * Phone number of the user
   */
  phone: string;
  tickets: Array<string>;
}

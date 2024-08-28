/* tslint:disable */
/* eslint-disable */
export interface Schedule {

  /**
   * Date of the schedule
   */
  date: string;

  /**
   * End time of the schedule
   */
  end_time: string;

  /**
   * Auto-generated unique identifier
   */
  _id?: string;

  /**
   * ID of the Movie associated with the schedule
   */
  movie: string;

  /**
   * ID of the screen associated with the schedule
   */
  screen: string;

  /**
   * Start time of the schedule
   */
  start_time: string;
}

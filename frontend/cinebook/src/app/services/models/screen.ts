/* tslint:disable */
/* eslint-disable */
import { SeatRange } from '../models/seat-range';
export interface Screen {

  /**
   * Description of the screen
   */
  description?: string;

  /**
   * Auto-generated unique identifier
   */
  id?: string;

  /**
   * Number of the screen
   */
  screenNumber: number;
  seatLayout: Array<SeatRange>;

  /**
   * Total number of seats
   */
  totalSeats: number;
}

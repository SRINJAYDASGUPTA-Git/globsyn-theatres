/* tslint:disable */
/* eslint-disable */
export interface TicketRequest {

  /**
   * Date of the event
   */
  date: string;

  /**
   * Auto-generated unique identifier
   */
  id?: string;

  /**
   * ID of the movie
   */
  movie: string;

  /**
   * Name of the ticket holder or event
   */
  name: string;

  /**
   * Price of the ticket
   */
  price: number;

  /**
   * ID of the schedule
   */
  schedule: string;

  /**
   * Screen number
   */
  screen: number;

  /**
   * List of seat numbers
   */
  seat: Array<string>;

  /**
   * Type of seat (e.g., regular, VIP)
   */
  seatType: string;

  /**
   * Time of the event in HH:mm format
   */
  time: string;
}

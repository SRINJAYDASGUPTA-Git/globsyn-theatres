/* tslint:disable */
/* eslint-disable */
import { BookingDetails } from '../models/booking-details';
export interface EmailTicketBody {
  bookingDetails: BookingDetails;
  email: string;
}

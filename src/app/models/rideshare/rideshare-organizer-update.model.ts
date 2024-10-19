import { AddressCreateRideShare } from '../Address/address-create-rideshare';


export interface RideShareOrganizerUpdate {
  id?: number;
  departureTime: Date;
  arrivalTime: Date;
  departureAddress: AddressCreateRideShare;
  arrivalAddress: AddressCreateRideShare;
  organizer: { id: number };
  availableSeats: number | null;
}

import { AddressCreateRideShare } from '../Address/address-create-rideshare';


export interface RideShareOrganizerCreate {
  id?: number;
  departureTime: Date;
  arrivalTime: Date;
  departureAddress: AddressCreateRideShare;
  arrivalAddress: AddressCreateRideShare;
  availableSeats: number | null;
  organizer: { id: number };
  vehicle: { id: number };
}

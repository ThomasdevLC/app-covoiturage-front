import { AddressCreateRideShare } from '../Address/address-create-rideshare';
import { Address } from '../Address/address.model';
import { Employee } from '../employee.model';

export interface RideShareCreate {
  departureTime: Date;
  arrivalTime: Date;
  departureAddress: AddressCreateRideShare;
  arrivalAddress: AddressCreateRideShare;
  organizer: { id: number };
  availableSeats: number;
}

import { AddressCreateRideShare } from '../Address/address-create-rideshare';
import { PrivateVehicle } from '../private-vehicle.model';


export interface RideShareOrganizerUpdate {
  id?: number;
  departureTime: string;
  arrivalTime: string;
  departureAddress: AddressCreateRideShare;
  arrivalAddress: AddressCreateRideShare;
  availableSeats: number | null;
  organizer: { id: number };
  vehicle: { id: number };
}

import { RideShare } from '../rideshare/rideshare.model';

export interface Address {
  id: number;
  number: number;
  street: string;
  code: string;
  city: string;
  rideShareDepartures?: RideShare[];
  rideShareArrivals?: RideShare[];
}

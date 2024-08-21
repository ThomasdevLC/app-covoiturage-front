import { RideShare } from './rideshare.model';

export interface Address {
  id: number;
  number: number;
  street: string;
  code: string;
  city: string;
  rideShareDepartures?: RideShare[];
  rideShareArrivals?: RideShare[];
}

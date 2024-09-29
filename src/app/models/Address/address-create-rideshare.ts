import { RideShare } from '../rideshare/rideshare.model';

export interface AddressCreateRideShare {
  number: number | null;
  street: string;
  code: string;
  city: string;
}

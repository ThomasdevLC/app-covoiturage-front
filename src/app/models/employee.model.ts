import { RideShare } from './rideshare/rideshare.model';
import { VehicleBooking } from './vehicle-booking.model';
import { PrivateVehicle } from './private-vehicle.model';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  admin: boolean;
  email: string;
  password: string;
  isActive: boolean;
  organizedRides?: RideShare[];
  vehicleBooking?: VehicleBooking[];
  vehicle?: PrivateVehicle[];
  rideShares?: RideShare[];
}

import { Vehicle } from './company-vehicle.model';

export interface VehicleBooking {
  id: number;
  startTime: Date;
  endTime: Date;
  companyVehicle: Vehicle;
}

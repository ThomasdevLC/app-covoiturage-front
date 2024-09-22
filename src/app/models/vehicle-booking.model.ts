import { CompanyVehicle } from './company-vehicle.model';

export interface VehicleBooking {
  startTime: string;
  endTime: string;
  vehicle: CompanyVehicle;
}

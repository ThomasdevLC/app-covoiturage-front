import { CompanyVehicle } from './company-vehicle.model';

export interface VehicleBooking {
  id: number;
  startTime: Date;
  endTime: Date;
  companyVehicle: CompanyVehicle;
}

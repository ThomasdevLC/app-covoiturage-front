import { CompanyVehicle } from './company-vehicle.model';

export interface VehicleBooking {
  companyVehicle: any;
  id: number;
  startTime: Date;
  endTime: Date;
}

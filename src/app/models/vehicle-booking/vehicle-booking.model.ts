import { CompanyVehicle } from "../company-vehicle/company-vehicle.model";

export interface VehicleBooking {
  id?: number,
  startTime: string;
  endTime: string;
  vehicle: CompanyVehicle;
}

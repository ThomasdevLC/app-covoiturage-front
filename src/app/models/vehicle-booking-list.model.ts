import { CompanyVehicle } from "./company-vehicle/company-vehicle.model";
import { Employee } from "./employee.model";

export interface VehicleBookingList {
  id: number,
  startTime: string;
  endTime: string;
  vehicle: CompanyVehicle;
  employee: Employee;
}

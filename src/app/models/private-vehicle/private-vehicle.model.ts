import { EmployeeConnected } from "../employee/employee-connected.model";
import { VehicleType } from "../enums/vehicle-type.enum";

export interface PrivateVehicle {
  id: number;
  number: string;
  brand: string;
  model: string;
  seats: number;
  type: VehicleType;
  employee: EmployeeConnected;
}

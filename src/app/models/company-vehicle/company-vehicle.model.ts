import { VehicleCategory } from "../enums/vehicle-category.enum";
import { VehicleMotor } from "../enums/vehicle-motor.enum";
import { VehicleStatus } from "../enums/vehicle-status.enum";
import { VehicleType } from "../enums/vehicle-type.enum";

export interface CompanyVehicle {
  id: number;
  number: string;
  brand: string;
  model: string;
  category: VehicleCategory;
  picUrl: string;
  motor: VehicleMotor;
  seats: number;
  co2PerKm: number;
  status: VehicleStatus;
  type: VehicleType.COMPANY;
}

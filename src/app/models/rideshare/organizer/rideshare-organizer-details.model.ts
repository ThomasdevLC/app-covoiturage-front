import { Address } from "../../Address/address.model";
import { Employee } from "../../employee/employee.model";
import { PrivateVehicle } from "../../private-vehicle/private-vehicle.model";


export interface RideShareOrganizerDetails {
  id: number;
  departureTime: Date;
  arrivalTime: Date;
  departureAddress: Address;
  arrivalAddress: Address;
  availableSeats: number;
  passengers: Employee[];
  vehicle: PrivateVehicle;
}

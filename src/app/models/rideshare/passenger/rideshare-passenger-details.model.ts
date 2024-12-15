import { Address } from "../../Address/address.model";
import { Employee } from "../../employee/employee.model";
import { PrivateVehicle } from "../../private-vehicle/private-vehicle.model";


export interface RideSharePassengerDetails {
  id: number;
  departureTime: Date;
  arrivalTime: Date;
  departureAddress: Address;
  arrivalAddress: Address;
  organizer: Employee;
  availableSeats: number;
  vehicle: PrivateVehicle;
  passengers: Employee[];
}

import { Address } from "../../Address/address.model";
import { Employee } from "../../employee.model";


export interface RideShareOrganizerDetails {
  id: number;
  departureTime: Date;
  arrivalTime: Date;
  departureAddress: Address;
  arrivalAddress: Address;
  availableSeats: number;
  passengers: Employee[];
}

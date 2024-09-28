import { Address } from '../Address/address.model';
import { Employee } from '../employee.model';
import { PrivateVehicle } from '../private-vehicle.model';

export interface RideShare {
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

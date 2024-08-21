import { Address } from './address.model';
import { Employee } from './employee.model';
import { Vehicle } from './vehicle.model';

export interface RideShare {
  id: number;
  departureTime: Date;
  arrivalTime: Date;
  departureAddress: Address;
  arrivalAddress: Address;
  organizer: Employee;
  availableSeats: number;
  vehicle: Vehicle;
  passengers: Employee[];
}

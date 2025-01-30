import { Address } from "../../Address/address.model";
import { Employee } from "../../employee/employee.model";
import { PrivateVehicle } from "../../private-vehicle/private-vehicle.model";

export interface RideShareOrganizerList {
    id: number;
    departureTime: string;
    arrivalTime: string;
    departureAddress: Address;
    arrivalAddress: Address;
    passengers: Employee[];
    vehicle: PrivateVehicle;
  }



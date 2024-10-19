import { Address } from "../../Address/address.model";
import { Employee } from "../../employee.model";

export interface RideShareOrganizerList {
    id: number;
    departureTime: string;
    arrivalTime: string;
    departureAddress: Address;
    arrivalAddress: Address;
    passengers: Employee[];
  }
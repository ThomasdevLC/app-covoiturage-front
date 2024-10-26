import { Address } from "../../Address/address.model";
import { PrivateVehicle } from "../../private-vehicle.model";

export interface RideSharePassengerList {
    id: number;
    departureTime: string;
    arrivalTime: string;
    departureAddress: Address;
    arrivalAddress: Address;
    availableSeats: number;
    vehicle: PrivateVehicle;
    formattedTripDuration: string;
  }
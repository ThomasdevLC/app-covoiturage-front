import { PrivateVehicle } from "../private-vehicle/private-vehicle.model";


export interface EmployeeProfile {
  id: number;                        
  firstName: string;                 
  lastName: string;                 
  gender: string;                  
  phone: string;                    
  email: string;                     
  vehicle: PrivateVehicle[];     
}

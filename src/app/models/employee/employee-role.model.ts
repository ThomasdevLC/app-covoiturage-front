import { RoleName } from "../enums/role-name.enum";

export interface EmployeeRole {
    id: number;
    gender: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: RoleName[];}

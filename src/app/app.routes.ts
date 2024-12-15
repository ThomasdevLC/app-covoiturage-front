import { Routes } from '@angular/router';
import { EmployeeDetailComponent } from './component/employee/employee-detail/employee-detail.component';
import { CompanyVehicleEmployeeListComponent } from './component/company-vehicle/employee/company-vehicle-employee-list/company-vehicle-employee-list.component';
import { LoginComponent } from './component/auth/login/login.component';
import { SignupComponent } from './component/auth/signup/signup.component';
import { BookingEmployeeCreateComponent } from './component/booking/employee/booking-employee-create/booking-employee-create.component';
import { BookingEmployeeListComponent } from './component/booking/employee/booking-employee-list/booking-employee-list.component';
import { RideshareOrganizerListComponent } from './component/rideshare/organizer/rideshare-organizer-list/rideshare-organizer-list.component';
import { RidesharePassengerReservationListComponent } from './component/rideshare/passenger/rideshare-passenger-reservation-list/rideshare-passenger-reservation-list.component';
import { RidesharePassengerSearchListComponent } from './component/rideshare/passenger/rideshare-passenger-search-list/rideshare-passenger-search-list.component';
import { RideshareOrganizerCreateComponent } from './component/rideshare/organizer/rideshare-organizer-create/rideshare-organizer-create.component';
import { BookingAdminListComponent } from './component/booking/admin/booking-admin-list/booking-admin-list.component';
import { RolesManagementListComponent } from './component/roles-management/roles-management-list/roles-management-list.component';
import { CompanyVehicleAdminManagementComponent } from './component/company-vehicle/admin/company-vehicle-admin-management/company-vehicle-admin-management.component';
import {MessageListComponent} from "./component/message/message-list/message-list.component";
import {AuthGuard} from "./service/auth/auth-guard/auth.guard";
import {RoleGuard} from "./service/auth/role-guard/role.guard";
import {RoleName} from "./models/enums/role-name.enum";

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // EMPLOYEE USER PROFILE
  { path: 'employees',component: EmployeeDetailComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [RoleName.USER,]
  }},

  // PRIVATE-VEHICLES
  { path: 'messages',component: MessageListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [RoleName.USER]
  }},

  // RIDESHARES
  { path: 'rideshares/create',component: RideshareOrganizerCreateComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [RoleName.USER]
  }},
  { path: 'rideshares/organizer', component: RideshareOrganizerListComponent ,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [RoleName.USER]
  }},
  { path: 'rideshares/search',component: RidesharePassengerSearchListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [RoleName.USER]
  }},
  { path: 'rideshares/passenger', component: RidesharePassengerReservationListComponent ,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [RoleName.USER]
  }},

  // COMPANY-VEHICLES
  { path: 'company-vehicles', component: CompanyVehicleAdminManagementComponent ,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [RoleName.ADMIN]
    }},
  { path: 'company-vehicles/status-and-booking-dates',component: CompanyVehicleEmployeeListComponent ,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [RoleName.USER]
  }},

  // BOOKINGS
  { path: 'bookings-create/:id', component: BookingEmployeeCreateComponent ,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [RoleName.USER]
  }},
  { path: 'bookings-list', component: BookingEmployeeListComponent ,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [RoleName.USER]
  }},
  { path: 'admin/bookings-list' , component: BookingAdminListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [RoleName.ADMIN]
  }},

  // ROLES-MANAGEMENT
  { path: 'roles-management',component: RolesManagementListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [RoleName.SUPER_ADMIN]
  }},
];

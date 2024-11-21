import { Routes } from '@angular/router';
import { EmployeeDetailComponent } from './component/employee/employee-detail/employee-detail.component';
import { CompanyVehicleEmployeeListComponent } from './component/company-vehicle/employee/company-vehicle-employee-list/company-vehicle-employee-list.component';
import { CompanyVehicleAdminListComponent } from './component/company-vehicle/admin/company-vehicle-admin-list/company-vehicle-admin-list.component';
import { LoginComponent } from './component/auth/login/login.component';
import { SignupComponent } from './component/auth/signup/signup.component';
import { PrivateVehicleCreateComponent } from './component/private-vehicle/private-vehicle-create/private-vehicle-create.component';
import { PrivateVehicleEditComponent } from './component/private-vehicle/private-vehicle-edit/private-vehicle-edit.component'; 
import { CompanyVehicleCreateComponent } from './component/company-vehicle/admin/company-vehicle-create/company-vehicle-create.component';
import { CompanyVehicleUpdateComponent } from './component/company-vehicle/admin/company-vehicle-update/company-vehicle-update.component';
import { BookingEmployeeCreateComponent } from './component/booking/employee/booking-employee-create/booking-employee-create.component';
import { BookingEmployeeListComponent } from './component/booking/employee/booking-employee-list/booking-employee-list.component';
import { RideshareOrganizerListComponent } from './component/rideshare/organizer/rideshare-organizer-list/rideshare-organizer-list.component';
import { RideshareOrganizerUpdateComponent } from './component/rideshare/organizer/rideshare-organizer-update/rideshare-organizer-update.component';
import { RidesharePassengerReservationDetailsComponent } from './component/rideshare/passenger/rideshare-passenger-reservation-details/rideshare-passenger-reservation-details.component';
import { RidesharePassengerReservationListComponent } from './component/rideshare/passenger/rideshare-passenger-reservation-list/rideshare-passenger-reservation-list.component';
import { RidesharePassengerSearchListComponent } from './component/rideshare/passenger/rideshare-passenger-search-list/rideshare-passenger-search-list.component';
import { RidesharePassengerReservationAddComponent } from './component/rideshare/passenger/rideshare-passenger-reservation-add/rideshare-passenger-reservation-add.component';
import { RideshareOrganizerCreateComponent } from './component/rideshare/organizer/rideshare-organizer-create/rideshare-organizer-create.component';
import { RideshareOrganizerDetailsComponent } from './component/rideshare/organizer/rideshare-organizer-details/rideshare-organizer-details.component';
import { BookingEmployeeUpdateComponent } from './component/booking/employee/booking-employee-update/booking-employee-update.component';
import { BookingAdminListComponent } from './component/booking/booking-admin-list/booking-admin-list.component';
import { RolesManagementListComponent } from './component/roles-management/roles-management-list/roles-management-list.component';
import { CompanyVehicleAdminManagementComponent } from './component/company-vehicle/admin/company-vehicle-admin-management/company-vehicle-admin-management.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employees',component: EmployeeDetailComponent},

  // RIDESHARES
  { path: 'rideshares/create',component: RideshareOrganizerCreateComponent},
  { path: 'rideshares/organizer', component: RideshareOrganizerListComponent },
  { path: 'rideshares/organizer/:id', component:RideshareOrganizerDetailsComponent },
  { path: 'rideshares/organizer/update/:id', component: RideshareOrganizerUpdateComponent },
  { path: 'rideshares/search',component: RidesharePassengerSearchListComponent},
  { path: 'rideshares/:id/add-passenger', component: RidesharePassengerReservationAddComponent },
  { path: 'rideshares/passenger', component: RidesharePassengerReservationListComponent },
  { path: 'rideshares/passenger/:id', component:RidesharePassengerReservationDetailsComponent },

  // COMPANY-VEHICLES
  { path: 'company-vehicles', component: CompanyVehicleAdminManagementComponent},
  { path: 'company-vehicles/create', component:CompanyVehicleCreateComponent},
  { path: 'company-vehicles/status-and-booking-dates',component: CompanyVehicleEmployeeListComponent },
  { path: 'company-vehicles/update/:id',component: CompanyVehicleUpdateComponent},

  // BOOKINGS
  { path: 'bookings-create/:id', component: BookingEmployeeCreateComponent },
  { path: 'bookings-list', component: BookingEmployeeListComponent },
  { path: 'bookings-update/:id', component: BookingEmployeeUpdateComponent },
  { path: 'admin/bookings-list' , component: BookingAdminListComponent},

  // PRIVATE-VEHICLES
  { path: 'private-vehicles/create',component: PrivateVehicleCreateComponent},
  { path: 'private-vehicles/edit/:id', component: PrivateVehicleEditComponent },
  
  // ROLES-MANAGEMENT
  { path: 'roles-management',component: RolesManagementListComponent},
];

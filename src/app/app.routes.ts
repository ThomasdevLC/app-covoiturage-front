import { Routes } from '@angular/router';
import { EmployeeDetailComponent } from './component/employee/employee-detail/employee-detail.component';
import { RideshareCreateComponent } from './component/rideshare/organizer/rideshare-create/rideshare-create.component';
import { RideshareSearchlistComponent } from './component/rideshare/passenger/rideshare-searchlist/rideshare-searchlist.component';
import { RideshareDetailComponent } from './component/rideshare/rideshare-detail/rideshare-detail.component';
import { CompanyVehicleEmployeeListComponent } from './component/company-vehicle/employee/company-vehicle-employee-list/company-vehicle-employee-list.component';
import { CompanyVehicleAdminListComponent } from './component/company-vehicle/admin/company-vehicle-admin-list/company-vehicle-admin-list.component';
import { LoginComponent } from './component/auth/login/login.component';
import { SignupComponent } from './component/auth/signup/signup.component';
import { PrivateVehicleCreateComponent } from './component/private-vehicle/private-vehicle-create/private-vehicle-create.component';
import { CompanyVehicleCreateComponent } from './component/company-vehicle/admin/company-vehicle-create/company-vehicle-create.component';
import { CompanyVehicleUpdateComponent } from './component/company-vehicle/admin/company-vehicle-update/company-vehicle-update.component';
import { BookingEmployeeCreateComponent } from './component/booking/employee/booking-employee-create/booking-employee-create.component';
import { BookingEmployeeListComponent } from './component/booking/employee/booking-employee-list/booking-employee-list.component';
import { RideshareAddReservationComponent } from './component/rideshare/passenger/rideshare-add-reservation/rideshare-add-reservation.component';
import { RideshareOrganizerListComponent } from './component/rideshare/organizer/rideshare-organizer-list/rideshare-organizer-list.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employees/:id',component: EmployeeDetailComponent},
  //RIDESHARES
  { path: 'rideshares/create',component: RideshareCreateComponent},
  { path: 'rideshares/search',component: RideshareSearchlistComponent},
  { path: 'rideshares/:id/add-passenger', component: RideshareAddReservationComponent },
  { path: 'rideshares/organizer', component: RideshareOrganizerListComponent },
  { path: 'rideshares/:id', component: RideshareDetailComponent },
  //COMPANY-VEHICLES
  { path: 'company-vehicles', component: CompanyVehicleAdminListComponent},
  { path: 'company-vehicles/create', component:CompanyVehicleCreateComponent},
  { path: 'company-vehicles/status-and-booking-dates',component: CompanyVehicleEmployeeListComponent, },
  { path: 'company-vehicles/update/:id',component: CompanyVehicleUpdateComponent},
  //BOOKINGS
  { path: 'bookings-create/:id', component: BookingEmployeeCreateComponent },
  { path: 'bookings-list', component: BookingEmployeeListComponent },
  //PRIVATE-VEHICLES
  { path: 'private-vehicles/create',component: PrivateVehicleCreateComponent},
];

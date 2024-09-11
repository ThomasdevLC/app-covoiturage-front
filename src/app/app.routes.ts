import { Routes } from '@angular/router';
import { EmployeeDetailComponent } from './component/employee/employee-detail/employee-detail.component';
import { RideshareSearchlistComponent } from './component/rideshare/rideshare-searchlist/rideshare-searchlist.component';
import { RideshareDetailComponent } from './component/rideshare/rideshare-detail/rideshare-detail.component';
import { CompanyVehicleEmployeeListComponent } from './component/company-vehicle/employee/company-vehicle-employee-list/company-vehicle-employee-list.component';
import { CompanyVehicleAdminListComponent } from './component/company-vehicle/admin/company-vehicle-admin-list/company-vehicle-admin-list.component';
import { LoginComponent } from './component/auth/login/login.component';
import { SignupComponent } from './component/auth/signup/signup.component';
import { PrivateVehicleCreateComponent } from './component/private-vehicle/private-vehicle-create/private-vehicle-create.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'employees/:id',
    component: EmployeeDetailComponent,
  },
  {
    path: 'rideshares/search',
    component: RideshareSearchlistComponent,
  },

  { path: 'rideshares/:id', component: RideshareDetailComponent },

  {
    path: 'company-vehicles',
    component: CompanyVehicleAdminListComponent,
  },

  {
    path: 'company-vehicles/status-and-booking-dates',
    component: CompanyVehicleEmployeeListComponent,
  },
  {
    path: 'private-vehicles/create',
    component: PrivateVehicleCreateComponent,
  },
];

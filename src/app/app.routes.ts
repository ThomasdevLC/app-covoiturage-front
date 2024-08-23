import { Routes } from '@angular/router';
import { EmployeeDetailComponent } from './component/employee/employee-detail/employee-detail.component';
import { CompanyVehicleAdminListComponent } from './component/company-vehicle/admin/company-vehicle-admin-list/company-vehicle-admin-list.component';

export const routes: Routes = [
  {
    path: 'employees/:id',
    component: EmployeeDetailComponent,
  },
  {
    path: 'company-vehicles/brand/:brand',
    component: CompanyVehicleAdminListComponent,
  },
  {
    path: 'company-vehicles/number/:number',
    component: CompanyVehicleAdminListComponent,
  },
];

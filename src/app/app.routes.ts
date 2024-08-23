import { Routes } from '@angular/router';
import { EmployeeDetailComponent } from './component/employee/employee-detail/employee-detail.component';
import { CompanyVehicleEmployeeListComponent } from './component/company-vehicle/employee/company-vehicle-employee-list/company-vehicle-employee-list.component';

export const routes: Routes = [
  {
    path: 'employees/:id',
    component: EmployeeDetailComponent,
  },

  {
    path: 'company-vehicles/status/:status',
    component: CompanyVehicleEmployeeListComponent,
  },
  {
    path: 'company-vehicles/status/:status/arrivee/:dateArrivee/depart/:dateDepart',
    component: CompanyVehicleEmployeeListComponent,
  },
  
];

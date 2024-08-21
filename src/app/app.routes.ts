import { Routes } from '@angular/router';
import { EmployeeDetailComponent } from './component/employee/employee-detail/employee-detail.component';

export const routes: Routes = [
  {
    path: 'employees/:id',
    component: EmployeeDetailComponent,
  },
];

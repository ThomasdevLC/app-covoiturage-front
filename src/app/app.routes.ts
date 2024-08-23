import { Routes } from '@angular/router';
import { EmployeeDetailComponent } from './component/employee/employee-detail/employee-detail.component';
import { RideshareSearchlistComponent } from './component/rideshare/rideshare-searchlist/rideshare-searchlist.component';
import { RideshareDetailComponent } from './component/rideshare/rideshare-detail/rideshare-detail.component';

export const routes: Routes = [
  {
    path: 'employees/:id',
    component: EmployeeDetailComponent,
  },
  {
    path: 'rideshares/search',
    component: RideshareSearchlistComponent,
  },

  { path: 'rideshares/:id', component: RideshareDetailComponent },
];

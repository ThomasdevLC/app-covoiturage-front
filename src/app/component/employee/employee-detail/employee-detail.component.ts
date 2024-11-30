import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { EmployeeProfile } from '../../../models/employee/employee-profile.models';
import { EmployeeProfileService } from '../../../service/employee/profile/employee-profile.service';
import { PrivateVehicle } from '../../../models/private-vehicle/private-vehicle.model';
import { PrivateVehicleListComponent } from '../../private-vehicle/private-vehicle-list/private-vehicle-list.component';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule , RouterModule, PrivateVehicleListComponent], 
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent implements OnInit {
  employeeProfile$: Observable<EmployeeProfile> | undefined;
  vehicles: PrivateVehicle[] = [];
  errorMessage: string | null = null;

  constructor(
    private employeeProfileService: EmployeeProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployeeProfile();
  }

  loadEmployeeProfile(): void {
    // Directly assign the Observable from the service
    this.employeeProfile$ = this.employeeProfileService.getEmployeeProfileById();
  }

  onClick(): void {
    this.router.navigate(['/private-vehicles/create']);
  }
}

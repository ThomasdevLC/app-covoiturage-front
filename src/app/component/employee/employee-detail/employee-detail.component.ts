import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { EmployeeProfile } from '../../../models/employee/employee-profile.models';
import { EmployeeProfileService } from '../../../service/employee/profile/employee-profile.service';
import { PrivateVehicle } from '../../../models/private-vehicle/private-vehicle.model';
import { PrivateVehicleListComponent } from '../../private-vehicle/private-vehicle-list/private-vehicle-list.component';
import { LucideAngularModule } from 'lucide-angular';
import { LucideSharedModule } from '../../../shared/icons/lucide-shared/lucide-shared.module';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, PrivateVehicleListComponent, LucideAngularModule, LucideSharedModule],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent implements OnInit {
  employeeProfile$: Observable<EmployeeProfile> | undefined;
  vehicles: PrivateVehicle[] = [];
  errorMessage: string | null = null;

  constructor(
    private employeeProfileService: EmployeeProfileService,
  ) {}

  ngOnInit(): void {
    this.loadEmployeeProfile();
  }

  loadEmployeeProfile(): void {
    this.employeeProfile$ = this.employeeProfileService.getEmployeeProfileById();
  }
}

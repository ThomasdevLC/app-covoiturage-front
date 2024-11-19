import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { EmployeeProfile } from '../../../models/employee/employee-profile.models';
import { EmployeeProfileService } from '../../../service/employee/profile/employee-profile.service';
import { SecureApiService } from '../../../service/api/api-security/secure-api.service';
import { PrivateVehicleService } from '../../../service/private-vehicle/private-vehicle.service';
import { PrivateVehicle } from '../../../models/private-vehicle.model';
import { ErrorHandlerService } from '../../../service/shared/errors/error-handler.service';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent implements OnInit {
  employeeProfile$: Observable<EmployeeProfile> | undefined;
  vehicles: PrivateVehicle[] = [];
  errorMessage: string | null = null;

  constructor(
    private employeeProfileService: EmployeeProfileService,
    private secureApiService: SecureApiService, 
    private privateVehicleService: PrivateVehicleService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployeeProfile();
    this.loadEmployeePrivateVehicles(); 
  }

  loadEmployeeProfile(): void {
    // Directly assign the Observable from the service
    this.employeeProfile$ = this.employeeProfileService.getEmployeeProfileById();
  }

  loadEmployeePrivateVehicles(): void {
    this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
          return this.privateVehicleService.getVehiclesByEmployeeId(currentUser.id);  
      })
    ).subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;  
      },
      error: (error) => {
        this.errorHandlerService.handleError(error); 
      },
    });
  }

  onClick(): void {
    this.router.navigate(['/private-vehicles/create']);
  }

  editVehicle(vehicle: PrivateVehicle): void {
    this.router.navigate(['/private-vehicles/edit', vehicle.id]);
  }

  deleteVehicle(vehicle: PrivateVehicle): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le véhicule ${vehicle.brand} ${vehicle.model} (${vehicle.number}) ?`)) {
      this.privateVehicleService.deleteVehicle(vehicle.id).subscribe({
        next: () => {
          this.vehicles = this.vehicles.filter(v => v.id !== vehicle.id);
        },
        error: (error) => {
          this.errorHandlerService.handleError(error);
        },
      });
  }
}
}

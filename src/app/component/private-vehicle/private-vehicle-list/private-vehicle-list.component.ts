import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { PrivateVehicle } from '../../../models/private-vehicle/private-vehicle.model';
import { SecureApiService } from '../../../service/api/api-security/secure-api.service';
import { PrivateVehicleService } from '../../../service/private-vehicle/private-vehicle.service';
import { ErrorHandlerService } from '../../../service/shared/errors/error-handler.service';
import { PrivateVehicleItemComponent } from '../private-vehicle-item/private-vehicle-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-private-vehicle-list',
  standalone: true,
  imports: [ CommonModule, PrivateVehicleItemComponent],
  templateUrl: './private-vehicle-list.component.html',
  styleUrl: './private-vehicle-list.component.css'
})
export class PrivateVehicleListComponent implements OnInit {
  vehicles: PrivateVehicle[] = [];
  errorMessage: string | null = null;

  constructor(
    private secureApiService: SecureApiService, 
    private privateVehicleService: PrivateVehicleService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {}



  ngOnInit(): void {
    this.loadEmployeePrivateVehicles(); 
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

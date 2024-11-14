import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { CompanyVehicleAdminService } from '../../../../service/company-vehicle/admin/company-vehicle-admin.service';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { VehicleCategory } from '../../../../models/enums/vehicle-category.enum';
import { VehicleMotor } from '../../../../models/enums/vehicle-motor.enum';
import { VehicleStatus } from '../../../../models/enums/vehicle-status.enum';
import { CompanyVehicle } from '../../../../models/company-vehicle/company-vehicle.model';

@Component({
  selector: 'app-company-vehicle-admin-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './company-vehicle-admin-list.component.html',
  styleUrls: ['./company-vehicle-admin-list.component.css'],
})
export class CompanyVehicleAdminListComponent implements OnInit {
  vehicles: CompanyVehicle[] = [];
  brandFilter: string = '';
  numberFilter: string = '';
  errorMessage: string | null = null;

  categories = Object.values(VehicleCategory);
  motors = Object.values(VehicleMotor);
  statuses = Object.values(VehicleStatus);
  apiURL: any;
  http: any;

  constructor(
    private vehicleService: CompanyVehicleAdminService
  ) {
    
  }

  ngOnInit(): void {
    this.getAllVehicles();
  }

  getAllVehicles(): void {
    this.vehicleService
      .getAllVehicles(this.brandFilter.trim(), this.numberFilter.trim())
      .subscribe((vehicles) => (this.vehicles = vehicles));
    console.log('adminlist getall: ' + this.vehicles);
  }

  filterVehicles(): void {
    this.getAllVehicles();
  }
  
  clearFilters(): void {
    // Reset filters
    this.brandFilter = '';
    this.numberFilter = '';
    // Reload the full list of vehicles
    this.getAllVehicles();
  }


  // Fonction de suppression
  deleteCompanyVehicles(vehicleId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer le véhicule ?' + vehicleId)) {
      this.vehicleService.deleteCompanyVehicle(vehicleId).subscribe({
        next: () => {
          this.vehicles = this.vehicles.filter(
            (vehicle) => vehicle.id !== vehicleId
          );
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du véhicule:', err);
        },
      });
    }
  }
}

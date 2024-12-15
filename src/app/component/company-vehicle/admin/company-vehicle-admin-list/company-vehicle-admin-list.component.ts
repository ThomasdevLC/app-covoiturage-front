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
import { BookingAdminListComponent } from '../../../booking/admin/booking-admin-list/booking-admin-list.component';
import { ErrorHandlerService } from '../../../../shared/errors/error-handler.service';
import { CompanyVehicleAdminItemComponent } from '../company-vehicle-admin-item/company-vehicle-admin-item.component';
import { CompanyVehicleUpdateComponent } from '../company-vehicle-update/company-vehicle-update.component';

@Component({
  selector: 'app-company-vehicle-admin-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    BookingAdminListComponent,
    CompanyVehicleAdminItemComponent,
    CompanyVehicleUpdateComponent
  ],
  templateUrl: './company-vehicle-admin-list.component.html',
  styleUrls: ['./company-vehicle-admin-list.component.css'],
})
export class CompanyVehicleAdminListComponent implements OnInit {

  showBookings: boolean = false;

  vehicles: CompanyVehicle[] = [];
  brandFilter: string = '';
  numberFilter: string = '';
  selectedVehicle: CompanyVehicle | null = null;
  errorMessage: string | null = null;

  categories = Object.values(VehicleCategory);
  motors = Object.values(VehicleMotor);
  statuses = Object.values(VehicleStatus);
  apiURL: any;
  http: any;

  constructor(
    private vehicleService: CompanyVehicleAdminService,
    private errorHandlerService: ErrorHandlerService,

  ) {

  }

  ngOnInit(): void {
    this.getAllVehicles();
  }

  getAllVehicles(): void {
    this.vehicleService
      .getAllVehicles(this.brandFilter.trim(), this.numberFilter.trim())
      .subscribe((vehicles) => (this.vehicles = vehicles));
  }

  filterVehicles(): void {
    this.getAllVehicles();
  }

  clearFilters(): void {
    this.brandFilter = '';
    this.numberFilter = '';
    this.getAllVehicles();
  }


  onDeleteVehicle(vehicleId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer le véhicule ?' + vehicleId)) {
      this.vehicleService.deleteCompanyVehicle(vehicleId).subscribe({
        next: () => {
          this.vehicles = this.vehicles.filter(
            (vehicle) => vehicle.id !== vehicleId
          );
        },
        error: (error) => {
          this.errorHandlerService.handleError(error);
        },
      });
    }
  }
}

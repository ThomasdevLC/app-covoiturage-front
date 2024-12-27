import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { PrivateVehicle } from '../../../models/private-vehicle/private-vehicle.model';
import { SecureApiService } from '../../../service/api/api-security/secure-api.service';
import { PrivateVehicleService } from '../../../service/private-vehicle/private-vehicle.service';
import { ErrorHandlerService } from '../../../shared/errors/error-handler.service';
import { PrivateVehicleItemComponent } from '../private-vehicle-item/private-vehicle-item.component';
import { CommonModule } from '@angular/common';
import { PrivateVehicleEditComponent } from '../private-vehicle-edit/private-vehicle-edit.component';
import { PrivateVehicleCreateComponent } from '../private-vehicle-create/private-vehicle-create.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-private-vehicle-list',
  standalone: true,
  imports: [CommonModule, PrivateVehicleItemComponent, PrivateVehicleEditComponent, PrivateVehicleCreateComponent, DialogModule,
    ButtonModule, LucideAngularModule],
  templateUrl: './private-vehicle-list.component.html',
  styleUrls: ['./private-vehicle-list.component.css']
})
export class PrivateVehicleListComponent implements OnInit {
  vehicles: PrivateVehicle[] = [];
  errorMessage: string | null = null;
  isEditModalOpen: boolean = false;
  isCreateModalOpen: boolean = false;
  selectedVehicleId!: number;


  constructor(
    private secureApiService: SecureApiService,
    private privateVehicleService: PrivateVehicleService,
    private errorHandlerService: ErrorHandlerService,
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
    this.selectedVehicleId = vehicle.id;
    this.isEditModalOpen = true;
  }

  openCreateModal(): void {
    this.isCreateModalOpen = true;
  }


  closeEditModal(updated: boolean): void {
    this.isEditModalOpen = false;
    if (updated) {
      this.loadEmployeePrivateVehicles(); // Rafraîchir la liste si le véhicule a été mis à jour
    }
  }

    closeCreateModal(updated: boolean): void {
      this.isCreateModalOpen = false;
      if (updated) {
        this.loadEmployeePrivateVehicles(); // Refresh the list if a new vehicle was added
      }
    }

  deleteVehicle(vehicle: PrivateVehicle): void {
  {
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

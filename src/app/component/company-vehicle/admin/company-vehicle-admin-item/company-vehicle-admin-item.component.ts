import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CompanyVehicle } from '../../../../models/company-vehicle/company-vehicle.model';
import { CommonModule } from '@angular/common';
import {DialogModule} from "primeng/dialog";
import {PrimeTemplate} from "primeng/api";
import {CompanyVehicleUpdateComponent} from "../company-vehicle-update/company-vehicle-update.component";
import { LucideAngularModule } from 'lucide-angular';
import { VehicleCategoryPipe } from '../../../../shared/pipe/vehicle-category/vehicle-category.pipe';
import { MotorPipe } from '../../../../shared/pipe/motor/motor.pipe';
import { VehicleStatusPipe } from '../../../../shared/pipe/vehicle-status/vehicle-status.pipe';
import { ConfirmDialogComponent } from '../../../../shared/lib/confirm-dialog/confirm-dialog.component';
import { FormBuilder } from '@angular/forms';
import { CompanyVehicleAdminService } from '../../../../service/company-vehicle/admin/company-vehicle-admin.service';
import { ErrorHandlerService } from '../../../../shared/errors/error-handler.service';
import { ToastService } from '../../../../shared/toast/toast.service';

@Component({
  selector: 'app-company-vehicle-admin-item',
  standalone: true,
  imports: [CommonModule, DialogModule, PrimeTemplate, CompanyVehicleUpdateComponent, LucideAngularModule,
    VehicleCategoryPipe,
    MotorPipe,
    VehicleStatusPipe, ConfirmDialogComponent,
  ],
  templateUrl: './company-vehicle-admin-item.component.html',
  styleUrl: './company-vehicle-admin-item.component.css'
})
export class CompanyVehicleAdminItemComponent {
  @Input() vehicle!: CompanyVehicle; // Propriété d'entrée pour recevoir les détails du véhicule
  @Output() onModify = new EventEmitter<CompanyVehicle>(); // Événement pour le clic sur "Modifier"
  @Output() onUpdateComplete = new EventEmitter<CompanyVehicle>(); // Événement pour la mise à jour
  @Output() onDelete = new EventEmitter<number>(); // Événement pour la suppression
  displayDialog: boolean = false;

  isConfirmVisible: boolean = false;
  confirmationMessage: string = 'Êtes-vous sûr de vouloir supprimer ce véhicule ?'
  confirmationConfirmText: string = 'Valider';
  confirmationCancelText: string = 'Annuler';

  constructor(
    private toastService: ToastService,
  ) {}

  showConfirmation(): void {
    this.isConfirmVisible = true;
  }
  onConfirmCancel(): void {
    this.deleteVehicle();
    this.isConfirmVisible = false;

  }
  onCancelCancel(): void {
    this.isConfirmVisible = false;
  }

  modifyVehicle() {
    this.onModify.emit(this.vehicle);
    this.displayDialog = true;
  }

  handleUpdateComplete(updatedVehicle: CompanyVehicle) {
    this.displayDialog = false;
    this.onUpdateComplete.emit(updatedVehicle);
  }

  deleteVehicle() {
    this.toastService.showSuccess('Le véhicule a bien été supprimé.');
    this.onDelete.emit(this.vehicle.id);
  }
}

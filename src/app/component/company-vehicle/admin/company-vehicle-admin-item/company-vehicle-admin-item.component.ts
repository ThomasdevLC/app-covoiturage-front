import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CompanyVehicle } from '../../../../models/company-vehicle/company-vehicle.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {DialogModule} from "primeng/dialog";
import {PrimeTemplate} from "primeng/api";
import {
  RideshareOrganizerDetailsComponent
} from "../../../rideshare/organizer/rideshare-organizer-details/rideshare-organizer-details.component";
import {CompanyVehicleUpdateComponent} from "../company-vehicle-update/company-vehicle-update.component";

@Component({
  selector: 'app-company-vehicle-admin-item',
  standalone: true,
  imports: [CommonModule, DialogModule, PrimeTemplate, CompanyVehicleUpdateComponent],
  templateUrl: './company-vehicle-admin-item.component.html',
  styleUrl: './company-vehicle-admin-item.component.css'
})
export class CompanyVehicleAdminItemComponent {
  @Input() vehicle!: CompanyVehicle; // Propriété d'entrée pour recevoir les détails du véhicule
  @Output() onModify = new EventEmitter<CompanyVehicle>(); // Événement pour le clic sur "Modifier"
  @Output() onUpdateComplete = new EventEmitter<CompanyVehicle>(); // Événement pour la mise à jour
  @Output() onDelete = new EventEmitter<number>(); // Événement pour la suppression
  displayDialog: boolean = false;

  modifyVehicle() {
    this.onModify.emit(this.vehicle);
    this.displayDialog = true;
  }

  handleUpdateComplete(updatedVehicle: CompanyVehicle) {
    this.displayDialog = false;
    this.onUpdateComplete.emit(updatedVehicle);
  }

  deleteVehicle() {
    this.onDelete.emit(this.vehicle.id);
  }
}

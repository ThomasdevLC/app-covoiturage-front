import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrivateVehicle } from '../../../models/private-vehicle/private-vehicle.model';
import {DialogModule} from "primeng/dialog";
import {ConfirmDialogComponent} from "../../../shared/lib/confirm-dialog/confirm-dialog.component";
import {NgIf} from "@angular/common";
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-private-vehicle-item',
  standalone: true,
  imports: [
    DialogModule,
    ConfirmDialogComponent,
    NgIf,
    LucideAngularModule,
  ],
  templateUrl: './private-vehicle-item.component.html',
  styleUrls: ['./private-vehicle-item.component.css']
})
export class PrivateVehicleItemComponent {
  @Input() vehicle!: PrivateVehicle;
  @Output() edit = new EventEmitter<PrivateVehicle>();
  @Output() delete = new EventEmitter<PrivateVehicle>();

  isConfirmVisible: boolean = false;
  confirmationMessage: string = 'Êtes-vous sûr de vouloir supprimer ce véhicule ?'
  confirmationConfirmText: string = 'Valider';
  confirmationCancelText: string = 'Annuler';

  showConfirmation(): void {
    this.isConfirmVisible = true;
  }
  onConfirmCancel(): void {
    this.onDelete();
  }
  onCancelCancel(): void {
    this.isConfirmVisible = false;
  }


  onEdit(): void {
    this.edit.emit(this.vehicle);
  }
  onDelete(): void {
    this.delete.emit(this.vehicle);
  }
}

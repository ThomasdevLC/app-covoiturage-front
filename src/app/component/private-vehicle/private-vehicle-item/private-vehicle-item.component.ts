import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrivateVehicle } from '../../../models/private-vehicle/private-vehicle.model';
import {
  CompanyVehicleUpdateComponent
} from "../../company-vehicle/admin/company-vehicle-update/company-vehicle-update.component";
import {DialogModule} from "primeng/dialog";
import {PrimeTemplate} from "primeng/api";
import {PrivateVehicleEditComponent} from "../private-vehicle-edit/private-vehicle-edit.component";
import {CompanyVehicle} from "../../../models/company-vehicle/company-vehicle.model";

@Component({
  selector: 'app-private-vehicle-item',
  standalone: true,
  imports: [
    CompanyVehicleUpdateComponent,
    DialogModule,
    PrimeTemplate,
    PrivateVehicleEditComponent
  ],
  templateUrl: './private-vehicle-item.component.html',
  styleUrls: ['./private-vehicle-item.component.css']
})
export class PrivateVehicleItemComponent {
  @Input() vehicle!: PrivateVehicle;
  @Output() edit = new EventEmitter<PrivateVehicle>();
  @Output() delete = new EventEmitter<PrivateVehicle>();

  onEdit(): void {
    this.edit.emit(this.vehicle);
  }
  onDelete(): void {
    this.delete.emit(this.vehicle);
  }
}

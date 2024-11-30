import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrivateVehicle } from '../../../models/private-vehicle/private-vehicle.model';

@Component({
  selector: 'app-private-vehicle-item',
  standalone: true,
  imports: [],
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
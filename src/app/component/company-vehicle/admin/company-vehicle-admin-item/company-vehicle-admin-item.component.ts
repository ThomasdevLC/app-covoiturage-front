import { Component, Input } from '@angular/core';
import { CompanyVehicle } from '../../../../models/company-vehicle/company-vehicle.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-company-vehicle-admin-item',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './company-vehicle-admin-item.component.html',
  styleUrl: './company-vehicle-admin-item.component.css'
})
export class CompanyVehicleAdminItemComponent {
  @Input() vehicle!: CompanyVehicle; // Propriété d'entrée pour recevoir les détails du véhicule
  @Input() onDelete!: (vehicleId: number) => void; // Propriété d'entrée pour la suppression
  

}

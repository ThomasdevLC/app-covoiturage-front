import { Component } from '@angular/core';
import { CompanyVehicleAdminListComponent } from '../company-vehicle-admin-list/company-vehicle-admin-list.component';

import { BookingAdminListComponent } from '../../../booking/admin/booking-admin-list/booking-admin-list.component';
import { CommonModule } from '@angular/common';
import { CompanyVehicleCreateComponent } from '../company-vehicle-create/company-vehicle-create.component';

@Component({
  selector: 'app-company-vehicle-admin-management',
  standalone: true,
  imports: [CompanyVehicleAdminListComponent,CompanyVehicleCreateComponent, BookingAdminListComponent, CommonModule ],
  templateUrl: './company-vehicle-admin-management.component.html',
  styleUrl: './company-vehicle-admin-management.component.css'
})
export class CompanyVehicleAdminManagementComponent {
  activeTab: string = 'search'; // Onglet actif par défaut

  setActiveTab(tab: string) {
    this.activeTab = tab; // Changer l'onglet actif
  }

  onVehicleCreated() {
    // Changer l'onglet actif vers 'search' lorsque le véhicule est créé
    this.setActiveTab('search');
  }
}

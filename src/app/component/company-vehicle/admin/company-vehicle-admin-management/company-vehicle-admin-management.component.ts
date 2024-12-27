import { Component } from '@angular/core';
import { CompanyVehicleAdminListComponent } from '../company-vehicle-admin-list/company-vehicle-admin-list.component';

import { BookingAdminListComponent } from '../../../booking/admin/booking-admin-list/booking-admin-list.component';
import { CommonModule } from '@angular/common';
import { CompanyVehicleCreateComponent } from '../company-vehicle-create/company-vehicle-create.component';
import { LucideSharedModule } from '../../../../shared/icons/lucide-shared/lucide-shared.module';

@Component({
  selector: 'app-company-vehicle-admin-management',
  standalone: true,
  imports: [CompanyVehicleAdminListComponent,CompanyVehicleCreateComponent, BookingAdminListComponent, CommonModule,LucideSharedModule ],
  templateUrl: './company-vehicle-admin-management.component.html',
  styleUrl: './company-vehicle-admin-management.component.css'
})
export class CompanyVehicleAdminManagementComponent {
  activeTab: string = 'search';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  onVehicleCreated() {
    this.setActiveTab('search');
  }
}

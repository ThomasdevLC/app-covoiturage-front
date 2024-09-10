import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CompanyVehicleAdminService } from '../../../../service/company-vehicle/admin/company-vehicle-admin.service';
import { CompanyVehicle } from '../../../../models/company-vehicle.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-company-vehicle-admin-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './company-vehicle-admin-list.component.html',
  styleUrls: ['./company-vehicle-admin-list.component.css'],
})
export class CompanyVehicleAdminListComponent implements OnInit {
  vehicles: CompanyVehicle[] = [];
  brandFilter: string = '';
  numberFilter: string = '';

  constructor(private companyVehicleAdminService: CompanyVehicleAdminService) {}

  ngOnInit(): void {
    this.getAllVehicles();
  }

  getAllVehicles(): void {
    this.companyVehicleAdminService
      .getAllVehicles(this.brandFilter.trim(), this.numberFilter.trim())
      .subscribe((vehicles) => (this.vehicles = vehicles));
  }

  filterVehicles(): void {
    this.getAllVehicles();
  }
}

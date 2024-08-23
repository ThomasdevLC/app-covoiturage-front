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
  companyVehicles: CompanyVehicle[] = [];
  brand: string = '';
  model: string = '';

  constructor(
    private route: ActivatedRoute,
    private companyVehicleAdminService: CompanyVehicleAdminService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.brand = params['brand'] || '';
      this.model = params['model'] || '';
      this.search();
    });
  }

  searchByBrand(): void {
    this.model = '';
    this.search();
  }

  searchByModel(): void {
    this.brand = '';
    this.search();
  }

  private search(): void {
    if (this.brand) {
      this.companyVehicleAdminService
        .searchByBrand(this.brand)
        .subscribe((vehicles) => (this.companyVehicles = vehicles));
    } else if (this.model) {
      this.companyVehicleAdminService
        .searchByModel(this.model)
        .subscribe((vehicles) => (this.companyVehicles = vehicles));
    } else {
      this.companyVehicles = [];
    }
  }
}

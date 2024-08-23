import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  OnSameUrlNavigation,
  RouterModule,
} from '@angular/router';
import { Vehicle } from '../../../../models/vehicle.model';
import { CompanyVehicleAdminService } from '../../../../service/company-vehicle/admin/company-vehicle-admin.service';
import { popNumber } from 'rxjs/internal/util/args';

@Component({
  selector: 'app-company-vehicle-admin-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './company-vehicle-admin-list.component.html',
  styleUrls: ['./company-vehicle-admin-list.component.css'],
})
export class CompanyVehicleAdminListComponent implements OnInit {
  vehicle: Vehicle[] | undefined = [];
  constructor(
    private companyVehicleAdminService: CompanyVehicleAdminService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const brand = this.route.snapshot.paramMap.get('brand');
    const number = this.route.snapshot.paramMap.get('number');
    console.log('brand from url', brand);
    if (brand) {
      this.companyVehicleAdminService.getByBrand(brand).subscribe({
        next: (data) => {
          console.log('Données reçues:', data);
          this.vehicle = data; // Assurez-vous que 'data' est bien un tableau de Vehicle
        },
        error: (err) => {
          console.error(
            'Erreur lors de la récupération des données du véhicule',
            err
          );
        },
      });
    } else if (number) {
      this.companyVehicleAdminService.getByNumber(number).subscribe({
        next: (data) => {
          console.log('Données reçues:', data);
          this.vehicle = data;
        },
        error: (err) => {
          console.error(
            'Erreur lors de la récupération des données du véhicule',
            err
          );
        },
      });
    } else {
      console.log("aucune marque trouvée dans l'url");
    }
  }
}

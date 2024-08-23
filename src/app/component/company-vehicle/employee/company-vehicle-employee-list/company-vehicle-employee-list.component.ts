import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CompanyVehicle } from '../../../../models/company-vehicle.model';
import { CompanyVehicleEmployeeService } from '../../../../service/company-vehicle/employee/company-vehicle-employee.service';

@Component({
  selector: 'app-company-vehicle-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './company-vehicle-employee-list.component.html',
  styleUrls: ['./company-vehicle-employee-list.component.css'],
})
export class CompanyVehicleEmployeeListComponent implements OnInit {
  vehicle: CompanyVehicle[] | undefined = [];
  //data from table2 cf company-vehicle-employee-service.ts-> ICI???SUITE

  constructor(
    private companyVehicleEmployeeService: CompanyVehicleEmployeeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const status = this.route.snapshot.paramMap.get('status');
    const dateArrivee = this.route.snapshot.paramMap.get('dateArrivee');
    const dateDepart = this.route.snapshot.paramMap.get('dateDepart');

    if (status) {
      console.log(
        'status from URL:',
        status + ' arr: ' + dateArrivee + ' dep: ' + dateDepart
      );
      this.companyVehicleEmployeeService
        .getCompanyVehicleByStatus(status)
        .subscribe({
          next: (data) => {
            console.log('stat Données reçues:', data);
            this.vehicle = data; // Assurez-vous que 'data' est bien un tableau de Vehicle
          },
          error: (err) => {
            console.error(
              'Erreur lors de la récupération des données du véhicule',
              err
            );
          },
        });
    } else if (status && dateDepart != null && dateArrivee != null) {
      // Cas où le statut et les dates sont fournis
      console.log(
        'status from URL:',
        status + ' arr: ' + dateArrivee + ' dep: ' + dateDepart
      );
      //+verifier avec back-end
      const departDate = new Date(dateDepart);
      const arriveeDate = new Date(dateArrivee);
      this.companyVehicleEmployeeService
        .getCompanyVehicleByStatusTime(status, arriveeDate, departDate)
        .subscribe({
          next: (data) => {
            console.log('statTime Données reçues avec dates:', data);
            this.vehicle = data; // Assurez-vous que 'data' est bien un tableau de Vehicle
          },
          error: (err) => {
            console.error(
              'Erreur lors de la récupération des données du véhicule avec dates',
              err
            );
          },
        });
    } else {
      console.log("Aucun statut trouvé dans l'URL");
    }
  }
}

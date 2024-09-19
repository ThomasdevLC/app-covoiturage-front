import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyVehicleAdminService } from '../../../../service/company-vehicle/admin/company-vehicle-admin.service';
import { CompanyVehicle } from '../../../../models/company-vehicle.model';

@Component({
  selector: 'app-company-vehicle-search-brand',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './company-vehicle-search-brand.component.html',
  styleUrls: ['./company-vehicle-search-brand.component.css'],
})
export class CompanyVehicleSearchBrandComponent {
   brand: string = '';
   vehicles$: Observable<CompanyVehicle[]> = of([]);
   errorMessage: string = '';
   vehicles: CompanyVehicle[] = [];
   constructor(private vehicleService: CompanyVehicleAdminService) {}
   ngOnInit(): void {}
   
   searchVehiclesByBrand(): void {
     if (this.brand.trim()) {
       this.vehicles$ = this.vehicleService.getVehiclesByBrand(this.brand).pipe(
         catchError((error) => {
           this.errorMessage = `Erreur: ${error.message}`;
           return of([]);
         })
       );
       this.vehicles$.subscribe((vehicles) => {
         this.vehicles = vehicles;
       });
     } else {
       this.errorMessage = 'La marque ne peut pas être vide.';
       this.vehicles = [];
     }
   }
}

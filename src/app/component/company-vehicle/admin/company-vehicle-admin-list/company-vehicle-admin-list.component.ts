import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CompanyVehicleAdminService } from '../../../../service/company-vehicle/admin/company-vehicle-admin.service';
import { CompanyVehicle } from '../../../../models/company-vehicle.model';
import { FormBuilder, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { VehicleCategory } from '../../../../models/enums/vehicle-category.enum';
import { VehicleMotor } from '../../../../models/enums/vehicle-motor.enum';
import { VehicleStatus } from '../../../../models/enums/vehicle-status.enum';

@Component({
  selector: 'app-company-vehicle-admin-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './company-vehicle-admin-list.component.html',
  styleUrls: ['./company-vehicle-admin-list.component.css'],
})
export class CompanyVehicleAdminListComponent implements OnInit {
  vehicles: CompanyVehicle[] = [];
  brandFilter: string = '';
  numberFilter: string = '';
  vehicleForm!: FormGroup;
  errorMessage: string | null = null;

  categories = Object.values(VehicleCategory);
  motors  = Object.values(VehicleMotor);
  statuses = Object.values(VehicleStatus);

  constructor( 
    private fb: FormBuilder,
    private vehicleService: CompanyVehicleAdminService) {
      this.vehicleForm = this.fb.group({
        
        number: ['', Validators.required],
        brand: ['', Validators.required],
        model: ['', Validators.required],
        category: ['', Validators.required],
        picUrl: ['', Validators.required],
        motor: ['', Validators.required],
        seats: [null, Validators.required],
        co2PerKm: [null, Validators.required]
        
      });
  }

  ngOnInit(): void {
    this.getAllVehicles();
  }

  getAllVehicles(): void {
    this.vehicleService
      .getAllVehicles(this.brandFilter.trim(), this.numberFilter.trim())
      .subscribe((vehicles) => (this.vehicles = vehicles));
  }

  filterVehicles(): void {
    this.getAllVehicles();
  }
  //
 
// Fonction de suppression
deleteCompanyVehicles(vehicleNumber: number): void {
  console.log("delete companyVehicle");
  //**this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== id);
  const index = this.vehicles.findIndex(v => v.id === vehicleNumber);
    if (index !== -1) {
      this.vehicles.splice(index, 1);
      // Optionnel : Afficher un message de succès
      console.log('Véhicule supprimé avec succès', vehicleNumber);
    } else {
      this.errorMessage = 'Véhicule introuvable.';
    }
}

// Fonction pour éditer un véhicule (vous pouvez implémenter le form ici)

upDateCompanyVehicles(vehicle: CompanyVehicle): void {
  console.log("edit companyVehicle");
  alert(`Edit vehicle: ${vehicle.brand} ${vehicle.model}`);
  console.log("??>"+vehicle.toString());
  this.vehicleService.updateVehicle(vehicle).subscribe({
    next: (updatedVehicle) => {
      const index = this.vehicles.findIndex(v => v.id === updatedVehicle.id);
      if (index !== -1) {
        this.vehicles[index] = { ...updatedVehicle };
        console.log('Véhicule modifié avec succès', updatedVehicle);
      }
    },
    error: (error) => {
      this.errorMessage = 'Erreur lors de la mise à jour du véhicule.';
      console.error('Erreur:', error);
    }
  });
  //
}
}

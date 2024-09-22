import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { CompanyVehicleAdminService } from '../../../../service/company-vehicle/admin/company-vehicle-admin.service';
import { CompanyVehicle } from '../../../../models/company-vehicle.model';
import { FormBuilder, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { VehicleCategory } from '../../../../models/enums/vehicle-category.enum';
import { VehicleMotor } from '../../../../models/enums/vehicle-motor.enum';
import { VehicleStatus } from '../../../../models/enums/vehicle-status.enum';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-company-vehicle-update',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './company-vehicle-update.component.html',
  styleUrls: ['./company-vehicle-update.component.css']
})
export class CompanyVehicleUpdateComponent {

  vehicleForm!: FormGroup;
  errorMessage: string | null = null;
  vehicles: CompanyVehicle[] = [];
  vehicle: CompanyVehicle | undefined;
  brandFilter: string = '';
  numberFilter: string = '';

  categories = Object.values(VehicleCategory);
  motors  = Object.values(VehicleMotor);
  statuses = Object.values(VehicleStatus);
  //companyVehicleAdminService: CompanyVehicleAdminService | undefined;

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
        co2PerKm: [null, Validators.required],
        status: ['',Validators.required],
        //type par defaut = CompanyVehicle
      });
    }
//
getAllVehicles(): void {
  console.log("getAllVehicle");
  this.vehicleService
    .getAllVehicles(this.brandFilter.trim(), this.numberFilter.trim())
    .subscribe((vehicles) => (this.vehicles = vehicles));
    console.log("numb: "+this.numberFilter+" brand: "+this.brandFilter+"\n vh: "+this.vehicles);
    if(this.vehicles!=null && this.vehicles.length==1){
      console.log("!=null: "+this.vehicles.values+" size: "+this.vehicles.length);
      this.vehicle = this.vehicles[0];
      this.populateForm(this.vehicle);
      this.errorMessage = "";
    }
    else if(this.vehicles==null || this.vehicles.length==0){
      this.errorMessage = "Véhicule inconnu!";
      console.log("!=null: "+this.vehicles.values+" size: "+this.vehicles.length);
      return;
    }
}
//number: string | undefined;
//brand: string | undefined;
filterVehicles(): void {
  console.log("filter");
  this.getAllVehicles();
}
//
// Pré-remplir le formulaire avec les données du véhicule
populateForm(vehicle: CompanyVehicle): void {
  console.log("populateForm");
  this.vehicleForm.patchValue({
    number: vehicle.number,
    brand: vehicle.brand,
    model: vehicle.model,
    category: vehicle.category,
    picUrl: vehicle.picUrl,
    motor: vehicle.motor,
    seats: vehicle.seats,
    status: vehicle.status,
    co2PerKm: vehicle.co2PerKm
  });
}
//
// Fonction pour soumettre les modifications
upDateCompanyVehicles(): void {
  if (this.vehicleForm.valid) {
    const updatedVehicle = this.vehicleForm.value;
    this.vehicleService.updateVehicle(updatedVehicle.id, updatedVehicle).subscribe(
      (response) => {
        console.log('Véhicule mis à jour avec succès');
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la mise à jour du véhicule';
      }
    );
  }
}
 // Fonction pour rechercher un véhicule par son immatriculation (number)
 getVehicleByNumber(number: string): void {
  console.log(" numb: "+number);
  this.vehicleService.getVehicleByNumber(number).subscribe(
    (vehicle: CompanyVehicle) => {
      if (vehicle) {
        this.populateForm(vehicle);  // Pré-remplir le formulaire
      }
    },
    (error) => {
      this.errorMessage = 'Véhicule non trouvé';
    }
  );
}
}

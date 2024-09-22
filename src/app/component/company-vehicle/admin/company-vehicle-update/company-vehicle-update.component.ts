import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { CompanyVehicleAdminService } from '../../../../service/company-vehicle/admin/company-vehicle-admin.service';
import { CompanyVehicle } from '../../../../models/company-vehicle.model';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { VehicleCategory } from '../../../../models/enums/vehicle-category.enum';
import { VehicleMotor } from '../../../../models/enums/vehicle-motor.enum';
import { VehicleStatus } from '../../../../models/enums/vehicle-status.enum';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-company-vehicle-update',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './company-vehicle-update.component.html',
  styleUrls: ['./company-vehicle-update.component.css'],
})
export class CompanyVehicleUpdateComponent implements OnInit {
  vehicleForm!: FormGroup;
  errorMessage: string | null = null;
  vehicle: CompanyVehicle | undefined;

  categories = Object.values(VehicleCategory);
  motors = Object.values(VehicleMotor);
  statuses = Object.values(VehicleStatus);

  constructor(
    private fb: FormBuilder,
    private vehicleService: CompanyVehicleAdminService,
    private route: ActivatedRoute // Injection de ActivatedRoute
  ) {
    this.vehicleForm = this.fb.group({
      number: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      category: ['', Validators.required],
      picUrl: ['', Validators.required],
      motor: ['', Validators.required],
      seats: [null, Validators.required],
      co2PerKm: [null, Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Récupérer l'ID du véhicule à partir de l'URL
    const vehicleId = +this.route.snapshot.paramMap.get('id')!;

    // Charger les détails du véhicule
    this.vehicleService.getVehicleById(vehicleId).subscribe(
      (vehicle) => {
        this.vehicle = vehicle;
        this.populateForm(vehicle); // Remplir le formulaire
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des détails du véhicule';
      }
    );
  }

  populateForm(vehicle: CompanyVehicle): void {
    this.vehicleForm.patchValue({
      number: vehicle.number,
      brand: vehicle.brand,
      model: vehicle.model,
      category: vehicle.category,
      picUrl: vehicle.picUrl,
      motor: vehicle.motor,
      seats: vehicle.seats,
      status: vehicle.status,
      co2PerKm: vehicle.co2PerKm,
    });
  }

  upDateCompanyVehicles(): void {
    if (this.vehicleForm.valid) {
      const updatedVehicle = { ...this.vehicle, ...this.vehicleForm.value }; // Combinez les valeurs du formulaire avec l'ID existant
      this.vehicleService
        .updateVehicle(updatedVehicle.id, updatedVehicle)
        .subscribe(
          (response) => {
            console.log('Véhicule mis à jour avec succès');
          },
          (error) => {
            this.errorMessage = 'Erreur lors de la mise à jour du véhicule';
          }
        );
    }
  }
}

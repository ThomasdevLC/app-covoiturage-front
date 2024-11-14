import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VehicleCategory } from '../../../../models/enums/vehicle-category.enum';
import { VehicleMotor } from '../../../../models/enums/vehicle-motor.enum';
import { VehicleStatus } from '../../../../models/enums/vehicle-status.enum';
import { CompanyVehicleAdminService } from '../../../../service/company-vehicle/admin/company-vehicle-admin.service';
import { Router } from '@angular/router';
import { CompanyVehicle } from '../../../../models/company-vehicle/company-vehicle.model';

@Component({
  selector: 'app-company-vehicle-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company-vehicle-create.component.html',
  styleUrl: './company-vehicle-create.component.css',
})
export class CompanyVehicleCreateComponent {
  vehicleForm!: FormGroup;
  errorMessage: string | null = null;

  categories = Object.values(VehicleCategory);
  motors = Object.values(VehicleMotor);
  statuses = Object.values(VehicleStatus);

  constructor(
    private fb: FormBuilder,
    private vehicleService: CompanyVehicleAdminService,
    private router: Router
  ) {
    this.vehicleForm = this.fb.group({
      number: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      category: ['', Validators.required],
      picUrl: ['', Validators.required],
      motor: ['', Validators.required],
      seats: [1, [Validators.required, Validators.min(1)]],
      co2PerKm: [1, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      const newVehicle: CompanyVehicle = this.vehicleForm.value;
      this.vehicleService.createVehicle(newVehicle).subscribe({
        next: (vehicle) => {
          console.log('Véhicule créé avec succès', vehicle);
          this.router.navigate(['/company-vehicles']);
        },
        error: (err) => {
          console.error('Erreur lors de la création du véhicule:', err);
          this.errorMessage =
            "Une erreur s'est produite lors de la création du véhicule.";
        },
      });
    } else {
      console.log('error-> champs');
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
    }
  }  
}

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
import { LicensePlateDirective } from '../../../../service/shared/directives/license-plate/license-plate.directive';
import { CapitalizeDirective } from '../../../../service/shared/directives/capitalize/capitalize.directive';
import { VehicleCategoryPipe } from '../../../../pipe/vehicle-category/vehicle-category.pipe';
import { MotorPipe } from '../../../../pipe/motor/motor.pipe';
import { ErrorHandlerService } from '../../../../service/shared/errors/error-handler.service';

@Component({
  selector: 'app-company-vehicle-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CapitalizeDirective,
    LicensePlateDirective,VehicleCategoryPipe, MotorPipe],
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
    private router: Router,
    private errorHandlerService: ErrorHandlerService,
    

  ) {
  this.vehicleForm = this.fb.group({
    number: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[A-Z]{2}-\d{3}-[A-Z]{2}$/), // Format pour numéro d'immatriculation
      ],
    ],
    brand: ['', Validators.required],
    model: ['', Validators.required],
    category: ['', Validators.required],
    picUrl: ['', Validators.required],
    motor: ['', Validators.required],
    seats: [1, [Validators.required, Validators.min(1)]],
    co2PerKm: [1, [Validators.required, Validators.min(0)]],
  });
}

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      const newVehicle: CompanyVehicle = this.vehicleForm.value;
      this.vehicleService.createVehicle(newVehicle).subscribe({
        next: (vehicle) => {
          this.router.navigate(['/company-vehicles']);
        },
        error: (error) => {
          this.errorHandlerService.handleError(error);
         
        },
      });
    } else {
      this.errorMessage =
      "Veuillez remplire tous les champs du formulaire.";    }
  }  
}

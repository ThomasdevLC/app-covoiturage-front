import { Component } from '@angular/core';
import { PrivateVehicle } from '../../../models/private-vehicle.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PrivateVehicleService } from '../../../service/private-vehicle/private-vehicle.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LicensePlateDirective } from '../../../service/shared/directives/license-plate/license-plate.directive';
import { CapitalizeDirective } from '../../../service/shared/directives/capitalize/capitalize.directive';
import { ToastService } from '../../../service/shared/toast/toast.service';

@Component({
  selector: 'app-private-vehicle-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LicensePlateDirective,CapitalizeDirective],
  templateUrl: './private-vehicle-create.component.html',
  styleUrl: './private-vehicle-create.component.css',
})
export class PrivateVehicleCreateComponent {
  vehicleForm: FormGroup;
  errorMessage: string | null = null;



  constructor(
    private fb: FormBuilder,
    private vehicleService: PrivateVehicleService ,
    private toastService: ToastService,
    private router: Router
  ) {
    this.vehicleForm = this.fb.group({
      number: [
        '', 
        [
          Validators.required, 
          Validators.pattern(/^[A-Z]{2}-\d{3}-[A-Z]{2}$/)
        ]
      ], 
      brand: ['', Validators.required],
      model: ['', Validators.required],
      seats: [1, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      const newVehicle: PrivateVehicle = this.vehicleForm.value;
      this.vehicleService.createVehicle(newVehicle).subscribe({
        next: (vehicle) => {
          console.log('Véhicule créé avec succès', vehicle);
          this.toastService.showSuccess('Votre véhicule a bien été enregistré.');
           this.router.navigate(['/employees']);
        },
        error: (err) => {
          console.error('Erreur lors de la création du véhicule:', err);
          this.errorMessage =
            "Une erreur s'est produite lors de la création du véhicule.";
        }
      });
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
    }
  } 
}

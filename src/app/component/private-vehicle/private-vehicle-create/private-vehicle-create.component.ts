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

@Component({
  selector: 'app-private-vehicle-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './private-vehicle-create.component.html',
  styleUrl: './private-vehicle-create.component.css',
})
export class PrivateVehicleCreateComponent {
  vehicleForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private vehicleService: PrivateVehicleService // private router: Router
  ) {
    this.vehicleForm = this.fb.group({
      number: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      seats: [1, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      const newVehicle: PrivateVehicle = this.vehicleForm.value;
      this.vehicleService.createVehicle(newVehicle).subscribe(
        (vehicle) => {
          console.log('Véhicule créé avec succès', vehicle);
          // this.router.navigate(['/vehicles']);
        },
        (error) => {
          console.error('Erreur lors de la création du véhicule', error);
          this.errorMessage =
            "Une erreur s'est produite lors de la création du véhicule.";
        }
      );
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
    }
  }
}

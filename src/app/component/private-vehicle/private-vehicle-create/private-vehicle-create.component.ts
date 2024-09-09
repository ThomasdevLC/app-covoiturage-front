import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrivateVehicleService } from '../../../service/private-vehicle/private-vehicle.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PrivateVehicle } from '../../../models/private-vehicle.model';

@Component({
  selector: 'app-private-vehicle-create',
  standalone: true,
  templateUrl: './private-vehicle-create.component.html',
  styleUrls: ['./private-vehicle-create.component.css'],
  imports: [ReactiveFormsModule],
})
export class PrivateVehicleCreateComponent {
  vehicleForm: FormGroup;
  userId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private privateVehicleService: PrivateVehicleService
  ) {
    this.vehicleForm = this.fb.group({
      number: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      seats: ['', [Validators.required, Validators.min(1)]],
      type: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.vehicleForm.valid) {
      const newVehicle: PrivateVehicle = {
        ...this.vehicleForm.value,
        employee: { id: 2 },
      };

      this.privateVehicleService.createVehicle(newVehicle).subscribe({
        next: (response: any) => {
          console.log('Véhicule créé avec succès', response);
        },
        error: (error: any) => {
          console.error('Erreur lors de la création du véhicule', error);
        },
      });
    }
  }
}

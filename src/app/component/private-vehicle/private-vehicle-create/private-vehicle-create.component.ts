import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PrivateVehicleService } from '../../../service/private-vehicle/private-vehicle.service';
import { CommonModule } from '@angular/common';
import { LicensePlateDirective } from '../../../shared/directives/license-plate/license-plate.directive';
import { CapitalizeDirective } from '../../../shared/directives/capitalize/capitalize.directive';
import { ToastService } from '../../../shared/toast/toast.service';
import { ErrorHandlerService } from '../../../shared/errors/error-handler.service';
import { PrivateVehicle } from '../../../models/private-vehicle/private-vehicle.model';

@Component({
  selector: 'app-private-vehicle-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LicensePlateDirective,CapitalizeDirective],
  templateUrl: './private-vehicle-create.component.html',
  styleUrl: './private-vehicle-create.component.css',
})
export class PrivateVehicleCreateComponent {
  vehicleForm: FormGroup;
  @Output() createComplete = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();
  isSubmitted = false;
  errorMessage: string | null = null;


  constructor(
    private fb: FormBuilder,
    private vehicleService: PrivateVehicleService,
    private errorHandlerService: ErrorHandlerService,
    private toastService: ToastService,
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
      this.isSubmitted = true;
    if (this.vehicleForm.valid) {
      const newVehicle: PrivateVehicle = this.vehicleForm.value;
      this.vehicleService.createVehicle(newVehicle).subscribe({
        next: () => {
          this.toastService.showSuccess('Votre véhicule a bien été enregistré.');
          this.createComplete.emit();
        },
        error: (error) => {
          this.errorHandlerService.handleError(error);
        },
      });
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs.';
    }
  }


  onCancel(): void {
    this.closeModal.emit(); // Émission de l'événement pour fermer le dialogue sans création
  }

}

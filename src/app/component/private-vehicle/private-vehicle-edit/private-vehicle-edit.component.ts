import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PrivateVehicleService } from '../../../service/private-vehicle/private-vehicle.service';
import { CommonModule } from '@angular/common';
import { ErrorHandlerService } from '../../../shared/errors/error-handler.service';
import { PrivateVehicle } from '../../../models/private-vehicle/private-vehicle.model';
import { LicensePlateDirective } from '../../../shared/directives/license-plate/license-plate.directive';
import { CapitalizeDirective } from '../../../shared/directives/capitalize/capitalize.directive';
import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-private-vehicle-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LicensePlateDirective, CapitalizeDirective],
  templateUrl: './private-vehicle-edit.component.html',
  styleUrl: './private-vehicle-edit.component.css'
})
export class PrivateVehicleEditComponent implements OnInit {
  @Input() vehicleId!: number;
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() updateComplete = new EventEmitter<PrivateVehicle>();
  vehicleForm!: FormGroup;
  errorMessage: string | null = null;
  vehicle: PrivateVehicle | undefined;
  constructor(
    private fb: FormBuilder,
    private privateVehicleService: PrivateVehicleService,
    private errorHandlerService: ErrorHandlerService,
    private toastService: ToastService,

  ) {}



  ngOnInit(): void {
    this.initializeForm();
    this.loadVehicle();
  }

  initializeForm(): void {
    this.vehicleForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      number: ['', Validators.required],
       seats: [ Validators.required],
    });
  }

  loadVehicle(): void {
    this.privateVehicleService.getVehicleById(this.vehicleId).subscribe({
      next: (vehicle: { brand: string; model: string; number: any, seats: number; }) => {
        this.vehicleForm.patchValue({
          brand: vehicle.brand,
          model: vehicle.model,
          number: vehicle.number,
          seats: vehicle.seats,
        });
      },
      error: (error) => {
        this.errorHandlerService.handleError(error);
      },
    });
  }

  saveChanges(): void {
    if (!this.vehicleForm.valid) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    const updatedVehicle: PrivateVehicle = {
      id: this.vehicleId,
      ...this.vehicleForm.value,
    };

    this.privateVehicleService.updateVehicle(this.vehicleId, updatedVehicle).subscribe({
      next: () => {
        this.errorMessage = null;
        this.updateComplete.emit(updatedVehicle);
        this.closeModal.emit(true);
        this.toastService.showSuccess('Votre véhicule a bien été modifié.');
      },
      error: (error) => {
        this.errorHandlerService.handleError(error);
      },
    });
  }

  cancel(): void {
    this.closeModal.emit(false);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrivateVehicleService } from '../../../service/private-vehicle/private-vehicle.service';
import { CommonModule } from '@angular/common';
import { ErrorHandlerService } from '../../../service/shared/errors/error-handler.service';
import { PrivateVehicle } from '../../../models/private-vehicle/private-vehicle.model';

@Component({
  selector: 'app-private-vehicle-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './private-vehicle-edit.component.html',
  styleUrls: ['./private-vehicle-edit.component.css']
})
export class PrivateVehicleEditComponent implements OnInit {
  vehicleId!: number;
  vehicleForm!: FormGroup;
  errorMessage: string | null = null;
  vehicle: PrivateVehicle | undefined;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private privateVehicleService: PrivateVehicleService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.vehicleId = Number(this.route.snapshot.paramMap.get('id'));
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
      ...this.vehicleForm.value,
    };

    this.privateVehicleService.updateVehicle(this.vehicleId, updatedVehicle).subscribe({
      next: () => {
        this.errorMessage = null; 
        this.router.navigate(['/employees']);
      },
      error: (error) => {
        this.errorHandlerService.handleError(error);
      },
    });
  }
}
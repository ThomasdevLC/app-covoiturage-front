import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrivateVehicleService } from '../../../service/private-vehicle/private-vehicle.service';
import { PrivateVehicle } from '../../../models/private-vehicle.model';
import { CommonModule } from '@angular/common';

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
      error: (err: any) => {
        console.error('Erreur lors du chargement du véhicule :', err);
        this.errorMessage = 'Impossible de charger les détails du véhicule.';
      }
    });
  }

  saveChanges(): void {
    if (this.vehicleForm.valid) {
      const updatedVehicle: PrivateVehicle = {
        ...this.vehicleForm.value 
      };

      // Appeler le service pour mettre à jour le véhicule
      this.privateVehicleService.updateVehicle(this.vehicleId, updatedVehicle).subscribe({
        next: () => {
          console.log('Véhicule mis à jour avec succès');
          this.router.navigate(['/employees']); // Redirection après la mise à jour
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du véhicule :', err);
          this.errorMessage = 'Impossible de mettre à jour le véhicule.';
        }
      });
    }
  }
}
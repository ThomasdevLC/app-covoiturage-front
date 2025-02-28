import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterModule,
} from '@angular/router';
import { CompanyVehicleAdminService } from '../../../../service/company-vehicle/admin/company-vehicle-admin.service';
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
import { CompanyVehicle } from '../../../../models/company-vehicle/company-vehicle.model';
import { ErrorHandlerService } from '../../../../shared/errors/error-handler.service';
import { CapitalizeDirective } from '../../../../shared/directives/capitalize/capitalize.directive';
import { LicensePlateDirective } from '../../../../shared/directives/license-plate/license-plate.directive';
import { VehicleCategoryPipe } from '../../../../shared/pipe/vehicle-category/vehicle-category.pipe';
import { MotorPipe } from '../../../../shared/pipe/motor/motor.pipe';
import { VehicleStatusPipe } from '../../../../shared/pipe/vehicle-status/vehicle-status.pipe';
import { ToastService } from '../../../../shared/toast/toast.service';

@Component({
  selector: 'app-company-vehicle-update',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CapitalizeDirective,
    LicensePlateDirective,
    VehicleCategoryPipe,
    MotorPipe,
    VehicleStatusPipe,
  ],
  templateUrl: './company-vehicle-update.component.html',
  styleUrls: ['./company-vehicle-update.component.css'],
})
export class CompanyVehicleUpdateComponent implements OnInit {
  vehicleForm!: FormGroup;
  errorMessage: string | null = null;
  isSubmitted = false;
  @Input() vehicle!: CompanyVehicle;
  @Output() closeModal = new EventEmitter<void>();
  @Output() updateComplete = new EventEmitter<CompanyVehicle>();

  categories = Object.values(VehicleCategory);
  motors = Object.values(VehicleMotor);
  statuses = Object.values(VehicleStatus);

  constructor(
    private fb: FormBuilder,
    private vehicleService: CompanyVehicleAdminService,
    private errorHandlerService: ErrorHandlerService,
    private toastService: ToastService,

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
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.vehicle) {
      this.populateForm(this.vehicle);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vehicle'] && this.vehicle) {
      this.populateForm(this.vehicle);
    }
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
    this.isSubmitted = true;
    if (this.vehicleForm.valid) {
      const updatedVehicle = {...this.vehicle, ...this.vehicleForm.value}; // Fusionner les données
      this.vehicleService.updateVehicle(updatedVehicle.id, updatedVehicle).subscribe({
        next: () => {
          const newStatus = this.vehicleForm.value.status;
          this.vehicleService.changeVehicleStatus(updatedVehicle.id, newStatus).subscribe({
            next: () => {
              this.toastService.showSuccess('Le véhicule a bien été mis à jour.');
              this.updateComplete.emit(updatedVehicle);
              this.closeModal.emit();
            },
            error: (error) => {
              this.errorHandlerService.handleError(error);
            }
          });
        },
        error: (error) => {
          this.errorHandlerService.handleError(error);
        }
      });
    }
  }}



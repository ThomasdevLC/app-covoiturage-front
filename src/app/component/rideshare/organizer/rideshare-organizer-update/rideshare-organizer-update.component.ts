import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {  Router } from '@angular/router';
import { RideshareOrganizerService } from '../../../../service/rideshare/organizer/rideshare-organizer.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RideShareOrganizerUpdate } from '../../../../models/rideshare/organizer/rideshare-organizer-update.model';
import { SecureApiService } from '../../../../service/api/api-security/secure-api.service';
import { PrivateVehicleService } from '../../../../service/private-vehicle/private-vehicle.service';
import { switchMap } from 'rxjs';
import { ErrorHandlerService } from '../../../../shared/errors/error-handler.service';
import { PrivateVehicle } from '../../../../models/private-vehicle/private-vehicle.model';
import {RideShareOrganizerDetails} from "../../../../models/rideshare/organizer/rideshare-organizer-details.model";
import { CalendarModule } from 'primeng/calendar';
import { DateFormatterPipe } from '../../../../shared/pipe/date-formatter/date-formatter.pipe';

@Component({
  selector: 'app-rideshare-organizer-update',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CalendarModule, DateFormatterPipe],
  templateUrl: './rideshare-organizer-update.component.html',
  styleUrl: './rideshare-organizer-update.component.css'
})
export class RideshareOrganizerUpdateComponent implements OnInit {
  rideShareForm: FormGroup; // Ajoutez le FormGroup pour le formulaire
  vehicles: PrivateVehicle[] = [];
  @Input() rideshare!: RideShareOrganizerDetails; // Ajoutez cette ligne
  @Output() updateCompleted = new EventEmitter<void>();
today: Date = new Date();


  constructor(
    private formBuilder: FormBuilder,
    private rideshareService: RideshareOrganizerService,
    private secureApiService: SecureApiService,
    private privateVehicleService: PrivateVehicleService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {
    // Initialisez le formulaire avec les mêmes champs que dans le composant create
    this.rideShareForm = this.formBuilder.group({
      departureTime: [new Date(), Validators.required],
      arrivalTime: [new Date(), Validators.required],
      departureAddress: this.formBuilder.group({
        number: [null, Validators.required],
        street: ['', Validators.required],
        code: ['', Validators.required],
        city: ['', Validators.required],
      }),
      arrivalAddress: this.formBuilder.group({
        number: [null, Validators.required],
        street: ['', Validators.required],
        code: ['', Validators.required],
        city: ['', Validators.required],
      }),
      availableSeats: [1, [Validators.required, Validators.min(1)]],
      vehicleId: [null, Validators.required],  // Ajout du champ vehicleId
    });
  }
  ngOnInit(): void {
    this.initializeForm();
    this.loadVehicles();
  }

  initializeForm(): void {
    if (this.rideshare) {
      this.rideShareForm.patchValue({
        departureTime: this.rideshare.departureTime,
        arrivalTime: this.rideshare.arrivalTime,
        departureAddress: this.rideshare.departureAddress,
        arrivalAddress: this.rideshare.arrivalAddress,
        availableSeats: this.rideshare.availableSeats,
        vehicleId: this.rideshare.vehicle.id,
      });
    }
  }

  loadVehicles(): void {
    this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        return this.privateVehicleService.getVehiclesByEmployeeId(currentUser.id);
      })
    ).subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;
      },
      error: (error) => {
        this.errorHandlerService.handleError(error);
      },
    });
  }

  updateRideShare(): void {
    const updatedRideShare: RideShareOrganizerUpdate = {
      ...this.rideShareForm.value,
      vehicle: { id: this.rideShareForm.value.vehicleId },
    };

    const id = this.rideshare.id;

    this.rideshareService.updateRideShare(id, updatedRideShare).subscribe({
      next: (updatedRideShare) => {
        console.log('RideShare mis à jour avec succès :', updatedRideShare);
        // Émettre un événement pour notifier le composant parent
        this.updateCompleted.emit();
      },
      error: (error) => {
        this.errorHandlerService.handleError(error);
      },
    });
  }
}

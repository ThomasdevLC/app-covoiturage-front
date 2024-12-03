import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RideshareOrganizerService } from '../../../../service/rideshare/organizer/rideshare-organizer.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RideShareOrganizerUpdate } from '../../../../models/rideshare/organizer/rideshare-organizer-update.model';
import { SecureApiService } from '../../../../service/api/api-security/secure-api.service';
import { PrivateVehicleService } from '../../../../service/private-vehicle/private-vehicle.service';
import { switchMap } from 'rxjs';
import { ErrorHandlerService } from '../../../../service/shared/errors/error-handler.service';
import { PrivateVehicle } from '../../../../models/private-vehicle/private-vehicle.model';
import {RideShareOrganizerDetails} from "../../../../models/rideshare/organizer/rideshare-organizer-details.model";

@Component({
  selector: 'app-rideshare-organizer-update',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './rideshare-organizer-update.component.html',
  styleUrl: './rideshare-organizer-update.component.css'
})
export class RideshareOrganizerUpdateComponent implements OnInit {
  rideShareForm: FormGroup; // Ajoutez le FormGroup pour le formulaire
  vehicles: PrivateVehicle[] = [];
  @Input() rideshare!: RideShareOrganizerDetails; // Ajoutez cette ligne
  @Output() updateCompleted = new EventEmitter<RideShareOrganizerDetails>();

  constructor(
    private formBuilder: FormBuilder,
    private rideshareService: RideshareOrganizerService,
    private secureApiService: SecureApiService,
    private privateVehicleService: PrivateVehicleService,
    private errorHandlerService: ErrorHandlerService,
    private route: ActivatedRoute,
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
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadRideShare(id); // Charger les données du covoiturage pour mise à jour
    this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
          return this.privateVehicleService.getVehiclesByEmployeeId(currentUser.id);
      })
    ).subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;
        console.log('Véhicules récupérés avec succès :', vehicles);
      },
      error: (error) => {
        this.errorHandlerService.handleError(error);
      },
    });
  }


  loadRideShare(id: number): void {
    this.rideshareService.getRideShareByIdForUpdate(id).subscribe({
      next: (rideShare) => {
        this.rideShareForm.patchValue({
          ...rideShare,
          vehicleId: rideShare.vehicle.id,  // Set the initial value of vehicleId
        });
        console.log('Fetched RideShare:', rideShare);
      },
      error: (error) => {
        this.errorHandlerService.handleError(error);
      },
    });
  }



  updateRideShare(): void {
    // Préparer l'objet pour la mise à jour en incluant le vehicleId
    const updatedRideShare: RideShareOrganizerUpdate = {
      ...this.rideShareForm.value,
      vehicle: { id: this.rideShareForm.value.vehicleId },
    };

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.rideshareService.updateRideShare(id, updatedRideShare).subscribe({
      next: (updatedRideShare) => {
        console.log('RideShare updated successfully:', updatedRideShare);
        this.router.navigate(['/rideshares/organizer']);
      },
      error: (error) => {
        this.errorHandlerService.handleError(error);
      },
    });
  }

}

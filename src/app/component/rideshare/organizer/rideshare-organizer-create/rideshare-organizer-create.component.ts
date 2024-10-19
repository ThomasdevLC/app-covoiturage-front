import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SecureApiService } from '../../../../service/api/secure-api.service';
import { RideshareOrganizerService } from '../../../../service/rideshare/organizer/rideshare-organizer.service';

@Component({
  selector: 'app-rideshare-organizer-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './rideshare-organizer-create.component.html',
  styleUrl: './rideshare-organizer-create.component.css',
})
export class RideshareOrganizerCreateComponent {
  rideShareForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private secureApiService: SecureApiService,
    private rideShareService: RideshareOrganizerService,
    private router: Router
  ) {
    // Initialisation du formulaire avec FormBuilder, ajout du champ vehicleId
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
      vehicleId: [null, Validators.required],  // Ajout du champ vehicleId avec validation
    });
  }

  createNewRideShare() {
    if (this.rideShareForm.invalid) {
      console.error('Le formulaire est invalide');
      return;
    }

    this.secureApiService
      .getCurrentUser()
      .pipe(
        switchMap((currentUser) => {
          if (currentUser) {
            const organizer = { id: currentUser.id };
            const newRideShare = {
              ...this.rideShareForm.value, // On récupère toutes les valeurs du formulaire, y compris vehicleId
              organizer,
              vehicle: { id: this.rideShareForm.value.vehicleId } // On associe le vehicleId au véhicule
            };
            return this.rideShareService.createRideShare(newRideShare);
          } else {
            throw new Error('Current user is not available');
          }
        })
      )
      .subscribe(
        (response) => {
          console.log('Ride share created successfully:', response);
          this.router.navigate(['/rideshares/organizer']);
        },
        (error) => {
          console.error('Error creating ride share:', error);
        }
      );
  }
}

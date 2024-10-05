import { Component } from '@angular/core';
import { RideShareService } from '../../../../service/rideshare/rideshare.service';
import { switchMap } from 'rxjs';
import { SecureApiService } from '../../../../service/api/secure-api.service';
import { RideShareCreate } from '../../../../models/rideshare/rideshare-create.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rideshare-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rideshare-create.component.html',
  styleUrl: './rideshare-create.component.css',
})
export class RideshareCreateComponent {
  rideShareData: Omit<RideShareCreate, 'organizer'> = {
    departureTime: new Date(),
    arrivalTime: new Date(),
    departureAddress: {
      number: null,
      street: '',
      code: '',
      city: '',
    },
    arrivalAddress: {
      number: null,
      street: '',
      code: '',
      city: '',
    },
    availableSeats: 1,
  };

  constructor(
    private secureApiService: SecureApiService,
    private rideShareService: RideShareService
  ) {}

  createNewRideShare() {
    this.secureApiService
      .getCurrentUser()
      .pipe(
        switchMap((currentUser) => {
          if (currentUser) {
            const organizer = { id: currentUser.id };
            const newRideShare: RideShareCreate = {
              ...this.rideShareData,
              organizer,
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
        },
        (error) => {
          console.error('Error creating ride share:', error);
        }
      );
  }
}

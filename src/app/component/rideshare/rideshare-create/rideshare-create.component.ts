import { Component } from '@angular/core';
import { RideShareService } from '../../../service/rideshare/rideshare.service';
import { switchMap } from 'rxjs';
import { SecureApiService } from '../../../service/api/secure-api.service';
import { RideShareCreate } from '../../../models/rideshare/rideshare-create.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rideshare-create',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rideshare-create.component.html',
  styleUrl: './rideshare-create.component.css',
})
export class RideshareCreateComponent {
  constructor(
    private rideShareService: RideShareService,
    private secureApiService: SecureApiService
  ) {}

  createNewRideShare() {
    const rideShareData: Omit<RideShareCreate, 'organizer'> = {
      departureTime: new Date('2024-12-28T16:30:00'),
      arrivalTime: new Date('2024-12-28T17:45:00'),
      departureAddress: {
        number: 18,
        street: 'Boulevard de la Liberté',
        code: '35000',
        city: 'Rennes',
      },
      arrivalAddress: {
        number: 25,
        street: 'Avenue de France',
        code: '44000',
        city: 'Nantes',
      },
      availableSeats: 4,
    };

    this.secureApiService
      .getCurrentUser()
      .pipe(
        switchMap((currentUser) => {
          if (currentUser) {
            const organizer = { id: currentUser.id };
            const newRideShare: RideShareCreate = {
              ...rideShareData,
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

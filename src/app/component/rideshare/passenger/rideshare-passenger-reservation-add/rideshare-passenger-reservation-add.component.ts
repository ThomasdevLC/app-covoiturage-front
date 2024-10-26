import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { RideShare } from '../../../../models/rideshare/rideshare.model';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../pipe/date-formatter/date-formatter.pipe';
import { RidesharePassengerService } from '../../../../service/rideshare/passenger/rideshare-passenger.service';
import { RideSharePassengerDetails } from '../../../../models/rideshare/passenger/rideshare-passenger-details.model';
@Component({
  selector: 'app-rideshare-passenger-reservation-add',
  standalone: true,
  imports: [CommonModule, RouterModule,DateFormatterPipe ],
  templateUrl: './rideshare-passenger-reservation-add.component.html',
  styleUrl: './rideshare-passenger-reservation-add.component.css'
})
export class RidesharePassengerReservationAddComponent implements OnInit {
    rideShareId!: number;
    rideShare$!: Observable<RideSharePassengerDetails>; 
  
    constructor(
      private route: ActivatedRoute,
      private rideShareService: RidesharePassengerService
    ) {}
  
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.rideShareId = +params['id']; // Convertir en nombre
        this.loadRideShare(); 
      });
    }
  
    loadRideShare(): void {
      this.rideShare$ = this.rideShareService.getRideShareById(this.rideShareId);
    this.rideShare$.subscribe({
      next: (rideShare) => {
        console.log('Récupération du covoiturage:', rideShare);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du covoiturage:', err);
      }
    });
    }
  
    joinAsPassenger(): void {
      this.rideShareService.joinAsPassenger(this.rideShareId).subscribe({
        next: () => {
          console.log('covoiturage réservé',);
        },
        error: (err) => {
          console.error('Erreur lors de la tentative de rejoindre le covoiturage:', err);
        }
      });
    }
  }
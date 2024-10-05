import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { RideShare } from '../../../../models/rideshare/rideshare.model';
import { RideShareService } from '../../../../service/rideshare/rideshare.service';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../pipe/date-formatter/date-formatter.pipe';

@Component({
  selector: 'app-rideshare-add-reservation',
  standalone: true,
  imports: [CommonModule, RouterModule,DateFormatterPipe ],
  templateUrl: './rideshare-add-reservation.component.html',
  styleUrl: './rideshare-add-reservation.component.css'
})
export class RideshareAddReservationComponent implements OnInit {
  rideShareId!: number;
  rideShare$!: Observable<RideShare>; 

  constructor(
    private route: ActivatedRoute,
    private rideShareService: RideShareService
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
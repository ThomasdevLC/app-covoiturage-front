import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../pipe/date-formatter/date-formatter.pipe';
import { RidesharePassengerService } from '../../../../service/rideshare/passenger/rideshare-passenger.service';
import { RideSharePassengerDetails } from '../../../../models/rideshare/passenger/rideshare-passenger-details.model';
import { ErrorHandlerService } from '../../../../service/shared/errors/error-handler.service';
@Component({
  selector: 'app-rideshare-passenger-reservation-add',
  standalone: true,
  imports: [CommonModule, RouterModule,DateFormatterPipe, RouterLink ],
  templateUrl: './rideshare-passenger-reservation-add.component.html',
  styleUrl: './rideshare-passenger-reservation-add.component.css'
})
export class RidesharePassengerReservationAddComponent implements OnInit {
    rideShareId!: number;
    rideShare$!: Observable<RideSharePassengerDetails>; 
  
    constructor(
      private route: ActivatedRoute,
      private rideShareService: RidesharePassengerService,
      private router: Router,
      private errorHandlerService: ErrorHandlerService
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
      error: (error) => {
        this.errorHandlerService.handleError(error); 
      },
    });
    }
  
    joinAsPassenger(): void {
      this.rideShareService.joinAsPassenger(this.rideShareId).subscribe({
        next: () => {
          console.log('covoiturage réservé',);
          this.router.navigate(['/rideshares/passenger']);
        },
        error: (error) => {
          this.errorHandlerService.handleError(error); 
        },
      });
    }
  }
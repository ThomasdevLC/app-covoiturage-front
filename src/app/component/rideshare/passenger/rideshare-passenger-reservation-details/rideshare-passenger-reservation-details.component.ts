import { Component, Input } from '@angular/core';
import { RideShare } from '../../../../models/rideshare/rideshare.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RidesharePassengerService } from '../../../../service/rideshare/passenger/rideshare-passenger.service';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../pipe/date-formatter/date-formatter.pipe';
import { RideSharePassengerDetails } from '../../../../models/rideshare/passenger/rideshare-passenger-details.model';
import { ErrorHandlerService } from '../../../../service/shared/errors/error-handler.service';


@Component({
  selector: 'app-rideshare-passenger-reservation-details',
  standalone: true,
  imports: [CommonModule, DateFormatterPipe],
  templateUrl: './rideshare-passenger-reservation-details.component.html',
  styleUrl: './rideshare-passenger-reservation-details.component.css'
})
export class RidesharePassengerReservationDetailsComponent {

  @Input() rideshare!: RideSharePassengerDetails;
  past = false;

  constructor(
    private rideshareService: RidesharePassengerService,
    private route: ActivatedRoute,
    private router: Router,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.rideshareService.past$.subscribe((value) => {
      this.past = value; // Mise à jour de `past` avec la valeur du service
    });
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadRideShare(id); 
  }

  loadRideShare(id: number): void {
    this.rideshareService.getRideShareById(id).subscribe({
      next: (rideShare: RideSharePassengerDetails) => {
        this.rideshare = rideShare; 
      },
      error: (error) => {
        this.errorHandlerService.handleError(error); 

      },
    });
  }

  onCancel(): void {
    if (!this.rideshare || !this.rideshare.id) return;
    
    this.rideshareService.cancelAsPassenger(this.rideshare.id).subscribe({
      next: () => {
        console.log('RideShare cancelled ');
        this.router.navigate(['/rideshares/passenger']); 
      },
      error: (error) => {
        this.errorHandlerService.handleError(error); 
      },
    });
  }
}



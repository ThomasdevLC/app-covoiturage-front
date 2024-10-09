import { Component, Input } from '@angular/core';
import { RideShare } from '../../../../models/rideshare/rideshare.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RidesharePassengerService } from '../../../../service/rideshare/passenger/rideshare-passenger.service';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../pipe/date-formatter/date-formatter.pipe';


@Component({
  selector: 'app-rideshare-passenger-reservation-details',
  standalone: true,
  imports: [CommonModule, DateFormatterPipe],
  templateUrl: './rideshare-passenger-reservation-details.component.html',
  styleUrl: './rideshare-passenger-reservation-details.component.css'
})
export class RidesharePassengerReservationDetailsComponent {

  @Input() rideshare!: RideShare;
  
  constructor(
    private rideshareService: RidesharePassengerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadRideShare(id); 
  }

  loadRideShare(id: number): void {
    this.rideshareService.getRideShareById(id).subscribe({
      next: (rideShare: RideShare) => {
        this.rideshare = rideShare; 
        console.log(' RideShare:', rideShare);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du covoiturage:', err);
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
      error: (err) => {
        console.error('Erreur lors de l\'annulation du covoiturage:', err);
      },
    });
  }
}



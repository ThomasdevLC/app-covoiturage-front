import { Component, Input } from '@angular/core';
import { RideShare } from '../../../../models/rideshare/rideshare.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RideshareOrganizerService } from '../../../../service/rideshare/organizer/rideshare-organizer.service';

@Component({
  selector: 'app-rideshare-reservation-details',
  standalone: true,
  imports: [],
  templateUrl: './rideshare-reservation-details.component.html',
  styleUrl: './rideshare-reservation-details.component.css'
})
export class RideshareReservationDetailsComponent {

  @Input() rideshare!: RideShare;
  
  constructor(
    private rideshareService: RideshareOrganizerService,
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
        console.log('Fetched RideShare:', rideShare);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du covoiturage:', err);
      },
    });
  }

}

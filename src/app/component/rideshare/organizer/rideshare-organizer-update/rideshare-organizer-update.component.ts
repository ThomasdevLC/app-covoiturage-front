import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RideShare } from '../../../../models/rideshare/rideshare.model';
import { RideshareOrganizerService } from '../../../../service/rideshare/organizer/rideshare-organizer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RideShareCreate } from '../../../../models/rideshare/rideshare-create.model';

@Component({
  selector: 'app-rideshare-organizer-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rideshare-organizer-update.component.html',
  styleUrl: './rideshare-organizer-update.component.css'
})
export class RideshareOrganizerUpdateComponent implements OnInit {
  rideShareData!: RideShareCreate; 

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
    this.rideshareService.getRideShareByIdForUpdate(id).subscribe({
      next: (rideShare) => {
        this.rideShareData = rideShare; 
        console.log('Fetched RideShare:', rideShare);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du covoiturage:', err);
      },
    });
  }



  updateRideShare(): void {
    if (this.rideShareData.id !== undefined) {
      this.rideshareService.updateRideShare(this.rideShareData.id, this.rideShareData).subscribe({
        next: (updatedRideShare) => {
          console.log('RideShare updated :', updatedRideShare);
        },
        error: (err) => {
          console.error('Error updating RideShare:', err);
        },
      });
    } else {
      console.error('RideShare ID is undefined. Cannot update RideShare.');
    }
  }
}
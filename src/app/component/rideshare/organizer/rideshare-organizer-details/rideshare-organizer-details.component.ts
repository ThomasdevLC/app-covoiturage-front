import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RideShare } from '../../../../models/rideshare/rideshare.model';
import { RideshareOrganizerService } from '../../../../service/rideshare/organizer/rideshare-organizer.service';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../pipe/date-formatter/date-formatter.pipe';

@Component({
  selector: 'app-rideshare-organizer-details',
  standalone: true,
  imports: [CommonModule, DateFormatterPipe],
  templateUrl: './rideshare-organizer-details.component.html',
  styleUrl: './rideshare-organizer-details.component.css'
})
export class RideshareOrganizerDetailsComponent {

  @Input() rideshare!: RideShare;
  past: boolean = false;
  
  constructor(
    private rideshareService: RideshareOrganizerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rideshareService.past$.subscribe((value) => {
      this.past = value; // Mise à jour de `past` avec la valeur du service
    console.log('Past:', this.past);
    });

console.log('RideShare:', this.rideshare);
 const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadRideShare(id); 
  }

  
  loadRideShare(id: number): void {
    this.rideshareService.getRideShareById(id).subscribe({
      next: (rideShare) => {
        this.rideshare = rideShare; 
        console.log('Fetched RideShare:', rideShare);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du covoiturage:', err);
      },
    });
  }

  onEdit() {
    this.router.navigate(['/rideshares/organizer/update', this.rideshare.id]);
  
  }
  
  onCancel() {
    if (this.rideshare.id !== undefined) {
      this.rideshareService.deleteRideShare(this.rideshare.id).subscribe({
      next: (response) => {
        console.log('RideShare supprimé avec succès :', response);
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du covoiturage :', error);
      }
    });

}
}

}

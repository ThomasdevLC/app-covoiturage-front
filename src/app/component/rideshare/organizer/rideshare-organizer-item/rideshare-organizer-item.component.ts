import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RideShare } from '../../../../models/rideshare/rideshare.model';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../pipe/date-formatter/date-formatter.pipe';
import { Router, RouterModule } from '@angular/router';
import { RideshareOrganizerService } from '../../../../service/rideshare/organizer/rideshare-organizer.service';

@Component({
  selector: 'app-rideshare-organizer-item',
  standalone: true,
  imports: [CommonModule, DateFormatterPipe, RouterModule],
  templateUrl: './rideshare-organizer-item.component.html',
  styleUrl: './rideshare-organizer-item.component.css'
})
export class RideshareOrganizerItemComponent {
  @Input() rideshare!: RideShare;
  @Output() rideShareDeleted = new EventEmitter<number>();

  
  constructor(private router: Router,     private rideshareService: RideshareOrganizerService,
  ) {}
 onEdit() {
  this.router.navigate(['/rideshares/organizer/update', this.rideshare.id]);

}

onCancel() {
  const rideShareId = this.rideshare.id;
  this.rideshareService.deleteRideShare(rideShareId).subscribe({
    next: (response) => {
      console.log('RideShare supprimé avec succès :', response);
    },
    error: (error) => {
      console.error('Erreur lors de la suppression du covoiturage :', error);
    }
  });
}
}
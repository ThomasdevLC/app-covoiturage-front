import { Component, Input } from '@angular/core';
import { RideShare } from '../../../../models/rideshare/rideshare.model';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../pipe/date-formatter/date-formatter.pipe';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-rideshare-organizer-item',
  standalone: true,
  imports: [CommonModule, DateFormatterPipe, RouterModule],
  templateUrl: './rideshare-organizer-item.component.html',
  styleUrl: './rideshare-organizer-item.component.css'
})
export class RideshareOrganizerItemComponent {
  @Input() rideshare!: RideShare;

  constructor(private router: Router) {}
 // Ajoutez des méthodes pour Modifier et Annuler ici
 onEdit() {
  this.router.navigate(['/rideshares/organizer/update', this.rideshare.id]);

}

onCancel() {
  console.log('Annuler', this.rideshare);
}

}

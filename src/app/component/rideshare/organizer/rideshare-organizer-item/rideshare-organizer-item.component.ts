import { Component, Input } from '@angular/core';
import { RideShare } from '../../../../models/rideshare/rideshare.model';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../pipe/date-formatter/date-formatter.pipe';

@Component({
  selector: 'app-rideshare-organizer-item',
  standalone: true,
  imports: [CommonModule, DateFormatterPipe],
  templateUrl: './rideshare-organizer-item.component.html',
  styleUrl: './rideshare-organizer-item.component.css'
})
export class RideshareOrganizerItemComponent {
  @Input() rideshare!: RideShare;


 // Ajoutez des méthodes pour Modifier et Annuler ici
 onEdit() {
  console.log('Modifier', this.rideshare);
  // Ajoutez votre logique de modification ici
}

onCancel() {
  console.log('Annuler', this.rideshare);
  // Ajoutez votre logique d'annulation ici
}

}

import { Component, Input } from '@angular/core';
import { RideShare } from '../../../../models/rideshare/rideshare.model';
import { DateFormatterPipe } from '../../../../pipe/date-formatter/date-formatter.pipe';

@Component({
  selector: 'app-rideshare-reservation-item',
  standalone: true,
  imports: [DateFormatterPipe],
  templateUrl: './rideshare-reservation-item.component.html',
  styleUrl: './rideshare-reservation-item.component.css'
})
export class RideshareReservationItemComponent {
  @Input() rideshare!: RideShare;

  onCancel() {
    console.log('Annuler', this.rideshare);
  }
}

import { Component, Input } from '@angular/core';
import { RideShare } from '../../../../models/rideshare/rideshare.model';
import { DateFormatterPipe } from '../../../../pipe/date-formatter/date-formatter.pipe';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-rideshare-reservation-item',
  standalone: true,
  imports: [DateFormatterPipe,RouterModule],
  templateUrl: './rideshare-reservation-item.component.html',
  styleUrl: './rideshare-reservation-item.component.css'
})
export class RideshareReservationItemComponent {
  @Input() rideshare!: RideShare;

  constructor(private router: Router) {}

  onCheckDetails() {
    this.router.navigate(['/rideshares/passenger/', this.rideshare.id]);
  
  }

  onCancel() {
    console.log('Annuler', this.rideshare);
  }
}

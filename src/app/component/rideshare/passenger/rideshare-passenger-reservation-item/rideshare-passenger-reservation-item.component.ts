import { Component, Input } from '@angular/core';
import { RideShare } from '../../../../models/rideshare/rideshare.model';
import { DateFormatterPipe } from '../../../../pipe/date-formatter/date-formatter.pipe';
import { Router, RouterModule } from '@angular/router';
import { RideSharePassengerList } from '../../../../models/rideshare/passenger/ridehare-passenger-list.model';

@Component({
  selector: 'app-rideshare-passenger-reservation-item',
  standalone: true,
  imports: [DateFormatterPipe,RouterModule],
  templateUrl: './rideshare-passenger-reservation-item.component.html',
  styleUrl: './rideshare-passenger-reservation-item.component.css'
})
export class RidesharePassengerReservationItemComponent {
  @Input() rideshare!: RideSharePassengerList;

  constructor(private router: Router) {}

  onCheckDetails() {
    this.router.navigate(['/rideshares/passenger/', this.rideshare.id]);
  
  }
}

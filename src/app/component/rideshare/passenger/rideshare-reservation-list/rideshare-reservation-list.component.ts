import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RideShare } from '../../../../models/rideshare/rideshare.model';
import { RidesharePassengerService } from '../../../../service/rideshare/passenger/rideshare-passenger.service';
import { CommonModule } from '@angular/common';
import { RideshareReservationItemComponent } from '../rideshare-reservation-item/rideshare-reservation-item.component';
import { DateFormatterPipe } from '../../../../pipe/date-formatter/date-formatter.pipe';

@Component({
  selector: 'app-rideshare-reservation-list',
  standalone: true,
  imports: [CommonModule, RideshareReservationItemComponent],
  templateUrl: './rideshare-reservation-list.component.html',
  styleUrl: './rideshare-reservation-list.component.css'
})
export class RideshareReservationListComponent {
  rideshares$!: Observable<RideShare[]>; 

  past: boolean = false;

  constructor(private rideshareOrganizerService: RidesharePassengerService) {}

  ngOnInit(): void {
    this.loadRideShares();
  }

  loadRideShares(): void {
    this.rideshares$ = this.rideshareOrganizerService.loadPassengerRideShares(this.past);
  }

  togglePastRideshares(): void {
    this.past = !this.past;
    this.loadRideShares(); 
  }


}

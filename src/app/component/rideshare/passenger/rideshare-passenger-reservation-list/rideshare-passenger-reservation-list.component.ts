import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RideShare } from '../../../../models/rideshare/rideshare.model';
import { RidesharePassengerService } from '../../../../service/rideshare/passenger/rideshare-passenger.service';
import { CommonModule } from '@angular/common';
import { RidesharePassengerReservationItemComponent } from '../rideshare-passenger-reservation-item/rideshare-passenger-reservation-item.component';

@Component({
  selector: 'app-rideshare-passenger-reservation-list',
  standalone: true,
  imports: [CommonModule, RidesharePassengerReservationItemComponent],
  templateUrl: './rideshare-passenger-reservation-list.component.html',
  styleUrl: './rideshare-passenger-reservation-list.component.css'
})
export class RidesharePassengerReservationListComponent {
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

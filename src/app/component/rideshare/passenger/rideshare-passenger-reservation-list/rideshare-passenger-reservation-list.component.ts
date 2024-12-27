import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { RidesharePassengerService } from '../../../../service/rideshare/passenger/rideshare-passenger.service';
import { CommonModule } from '@angular/common';
import { RidesharePassengerReservationItemComponent } from '../rideshare-passenger-reservation-item/rideshare-passenger-reservation-item.component';
import { RideSharePassengerList } from '../../../../models/rideshare/passenger/ridehare-passenger-list.model';

@Component({
  selector: 'app-rideshare-passenger-reservation-list',
  standalone: true,
  imports: [CommonModule, RidesharePassengerReservationItemComponent],
  templateUrl: './rideshare-passenger-reservation-list.component.html',
  styleUrl: './rideshare-passenger-reservation-list.component.css'
})
export class RidesharePassengerReservationListComponent implements OnInit {
  rideshares$!: Observable<RideSharePassengerList[]>;
  past: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private ridesharePassengerService: RidesharePassengerService) {}

  ngOnInit(): void {
    this.loadRideShares();
    this.ridesharePassengerService.setPast(this.past);

    this.subscription.add(
      this.ridesharePassengerService.rideshareCancelled$.subscribe(() => {
        this.loadRideShares();
      })
    );
  }

  loadRideShares(): void {
    this.rideshares$ = this.ridesharePassengerService.loadPassengerRideShares(this.past);
  }

  togglePastRideshares(value: boolean): void {
    this.past = value; // Modifie directement la valeur de past
    this.ridesharePassengerService.setPast(this.past);
    this.loadRideShares();
  }
}

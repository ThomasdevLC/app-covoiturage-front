import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { RideshareOrganizerService } from '../../../../service/rideshare/organizer/rideshare-organizer.service';
import { CommonModule } from '@angular/common';
import { RideshareOrganizerItemComponent } from '../rideshare-organizer-item/rideshare-organizer-item.component';
import { RideShareOrganizerList } from '../../../../models/rideshare/organizer/rideshare-organizer-list.model';


  @Component({
    selector: 'app-rideshare-organizer-list',
    standalone: true,
    imports: [CommonModule, RideshareOrganizerItemComponent],
    templateUrl: './rideshare-organizer-list.component.html',
    styleUrl: './rideshare-organizer-list.component.css'
  })
  export class RideshareOrganizerListComponent implements OnInit, OnDestroy {
    rideshares$!: Observable<RideShareOrganizerList[]>;
    past: boolean = false;
    errorMessage: string | null = null;
    private subscription: Subscription = new Subscription();

    constructor(private rideshareOrganizerService: RideshareOrganizerService) {}

    ngOnInit(): void {
      this.loadRideShares();
      this.rideshareOrganizerService.setPast(this.past);
      this.subscription.add(
      this.rideshareOrganizerService.rideshareCancelled$.subscribe(() => {
        this.loadRideShares();
      })
      );
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe(); // Clean up subscriptions
    }

    loadRideShares(): void {
      this.rideshares$ = this.rideshareOrganizerService.loadOrganizerRideShares(this.past);

    }

    togglePastRideshares(value: boolean): void {
      this.past = value;
      this.rideshareOrganizerService.setPast(this.past);
      this.loadRideShares();
    }
  }

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RideShare } from '../../../../models/rideshare/rideshare.model';
import { RideShareService } from '../../../../service/rideshare/rideshare.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RidesharePassengerItemComponent } from '../rideshare-passenger-item/rideshare-passenger-item.component'; 
import { DateFormatterPipe } from '../../../../pipe/date-formatter/date-formatter.pipe';
@Component({
  selector: 'app-rideshare-searchlist',
  standalone: true,
  imports: [CommonModule, FormsModule, RidesharePassengerItemComponent ],
  templateUrl: './rideshare-searchlist.component.html',
  styleUrl: './rideshare-searchlist.component.css',
})
export class RideshareSearchlistComponent implements OnInit {
  rideshares: RideShare[] = [];
  departureCity = '';
  arrivalCity = '';
  departureDateTime = '';

  constructor(
    private rideShareService: RideShareService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.departureCity = params['departureCity'] || '';
      this.arrivalCity = params['arrivalCity'] || '';
      this.departureDateTime = params['departureDateTime'] || '';

      this.searchRideShares(); // Perform initial search
    });
  }

  onInputChange(): void {
    // Trigger search if at least one field is filled
    if (this.departureCity || this.arrivalCity || this.departureDateTime) {
      this.searchRideShares();
    } else {
      this.rideshares = []; // Clear results if all fields are empty
    }
  }

  searchRideShares(): void {
    // If all fields are empty, reset rideshares
    if (!this.departureCity && !this.arrivalCity && !this.departureDateTime) {
      this.rideshares = [];
      return;
    }

    

    // Request to get rideshares
    this.rideShareService
      .getRideShares(this.departureCity, this.arrivalCity, this.departureDateTime)
      .subscribe({
        next: (rideshares: RideShare[]) => (this.rideshares = rideshares),
        error: (err) => console.error('Error fetching rideshares:', err),
      });
  }
}

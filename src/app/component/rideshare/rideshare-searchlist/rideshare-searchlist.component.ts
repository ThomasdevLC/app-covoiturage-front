import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RideShare } from '../../../models/rideshare.model';
import { RideShareService } from '../../../service/rideshare/rideshare.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rideshare-searchlist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rideshare-searchlist.component.html',
  styleUrl: './rideshare-searchlist.component.css',
})
export class RideshareSearchlistComponent implements OnInit {
  rideshares: RideShare[] = [];
  departureCity: string = '';
  arrivalCity: string = '';
  departureTime: string | undefined = undefined; // Store as string

  constructor(
    private rideShareService: RideShareService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.departureCity = params['departureCity'] || '';
      this.arrivalCity = params['arrivalCity'] || '';
      this.departureTime = params['departureTime'] || undefined; // Ensure this is a string
      this.searchRideShares();
    });
  }

  searchRideShares(): void {
    console.log('Search parameters:', {
      departureCity: this.departureCity,
      arrivalCity: this.arrivalCity,
      departureTime: this.departureTime,
    });

    this.rideShareService
      .getRideShares(this.departureCity, this.arrivalCity, this.departureTime)
      .subscribe({
        next: (rideshares: RideShare[]) => (this.rideshares = rideshares),
        error: (err) => console.error('Error fetching rideshares:', err),
      });
  }
}

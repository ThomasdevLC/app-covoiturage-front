import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RideShare } from '../../../models/rideshare.model';
import { RideShareService } from '../../../service/rideshare/rideshare.service';

@Component({
  selector: 'app-rideshare-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rideshare-detail.component.html',
  styleUrl: './rideshare-detail.component.css',
})
export class RideshareDetailComponent implements OnInit {
  rideShare: RideShare | undefined;

  constructor(
    private route: ActivatedRoute,
    private rideShareService: RideShareService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.rideShareService.getRideShareById(id).subscribe({
      next: (rideShare: RideShare) => {
        this.rideShare = rideShare;
        console.log('Fetched RideShare:', rideShare);
      },
      error: (err) => console.error('Error fetching rideshare:', err),
    });
  }
}

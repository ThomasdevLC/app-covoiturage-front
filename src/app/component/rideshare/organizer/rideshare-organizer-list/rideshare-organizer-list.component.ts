import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RideShare } from '../../../../models/rideshare/rideshare.model';
import { RideshareOrganizerService } from '../../../../service/rideshare/organizer/rideshare-organizer.service';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../pipe/date-formatter/date-formatter.pipe';
import { RideshareOrganizerItemComponent } from '../rideshare-organizer-item/rideshare-organizer-item.component';

@Component({
  selector: 'app-rideshare-organizer-list',
  standalone: true,
  imports: [CommonModule, DateFormatterPipe, RideshareOrganizerItemComponent],
  templateUrl: './rideshare-organizer-list.component.html',
  styleUrl: './rideshare-organizer-list.component.css'
})
export class RideshareOrganizerListComponent implements OnInit {
  rideshares$!: Observable<RideShare[]>; 

  past: boolean = false;

  constructor(private rideshareService: RideshareOrganizerService) {}

  ngOnInit(): void {
    this.loadRideShares();
  }

  loadRideShares(): void {
    this.rideshares$ = this.rideshareService.loadOrganizerRideShares(this.past);
  }

  togglePastRideshares(): void {
    this.past = !this.past;
    this.rideshareService.setPast(this.past); 
    this.loadRideShares(); 
  }
}
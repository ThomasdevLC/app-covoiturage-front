import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RideshareOrganizerService } from '../../../../service/rideshare/organizer/rideshare-organizer.service';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../pipe/date-formatter/date-formatter.pipe';
import { RideshareOrganizerItemComponent } from '../rideshare-organizer-item/rideshare-organizer-item.component';
import { RideshareApiResponse, RideShareOrganizerList } from '../../../../models/rideshare/organizer/rideshare-organizer-list.model';

@Component({
  selector: 'app-rideshare-organizer-list',
  standalone: true,
  imports: [CommonModule, DateFormatterPipe, RideshareOrganizerItemComponent],
  templateUrl: './rideshare-organizer-list.component.html',
  styleUrl: './rideshare-organizer-list.component.css'
})
export class RideshareOrganizerListComponent implements OnInit {
  rideshares$!: Observable<RideshareApiResponse>;  
  past: boolean = false;
      message: string = '';
      response: RideshareApiResponse | undefined; 

  constructor(private rideshareOrganizerService: RideshareOrganizerService) {}
  ngOnInit(): void {
    this.loadRideShares();
    this.rideshareOrganizerService.setPast(this.past); 

  }

  loadRideShares(): void {
    this.rideshares$ = this.rideshareOrganizerService.loadOrganizerRideShares(this.past);
  }

  togglePastRideshares(value: boolean): void {
    this.past = value; // Modifie directement la valeur de past
    this.rideshareOrganizerService.setPast(this.past); 
    this.loadRideShares(); 
  }
}
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RideShare } from '../../../../models/rideshare/rideshare.model';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../pipe/date-formatter/date-formatter.pipe';
import { Router, RouterModule } from '@angular/router';
import { RideshareOrganizerService } from '../../../../service/rideshare/organizer/rideshare-organizer.service';
import { RideShareOrganizerList } from '../../../../models/rideshare/organizer/rideshare-organizer-list.model';

@Component({
  selector: 'app-rideshare-organizer-item',
  standalone: true,
  imports: [CommonModule, DateFormatterPipe, RouterModule],
  templateUrl: './rideshare-organizer-item.component.html',
  styleUrl: './rideshare-organizer-item.component.css'
})
export class RideshareOrganizerItemComponent {
  @Input() rideshare!: RideShareOrganizerList;
  @Output() rideShareDeleted = new EventEmitter<number>();


  constructor(private router: Router,      
  ) {}

  onCheckDetails() {
    this.router.navigate(['/rideshares/organizer/', this.rideshare.id]);
  }
 
}

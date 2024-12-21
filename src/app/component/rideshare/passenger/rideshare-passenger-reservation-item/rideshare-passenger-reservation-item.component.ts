import { Component, Input } from '@angular/core';
import { DateFormatterPipe } from '../../../../shared/pipe/date-formatter/date-formatter.pipe';
import {Router, RouterModule} from '@angular/router';
import { RideSharePassengerList } from '../../../../models/rideshare/passenger/ridehare-passenger-list.model';
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {
  RidesharePassengerReservationDetailsComponent
} from "../rideshare-passenger-reservation-details/rideshare-passenger-reservation-details.component";
import { LucideAngularModule } from 'lucide-angular';
import { LucideSharedModule } from '../../../../shared/icons/lucide-shared/lucide-shared.module';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-rideshare-passenger-reservation-item',
  standalone: true,
  imports: [DateFormatterPipe, RouterModule, DialogModule,
    ButtonModule, RidesharePassengerReservationDetailsComponent, LucideAngularModule, LucideSharedModule, BadgeModule],
  templateUrl: './rideshare-passenger-reservation-item.component.html',
  styleUrl: './rideshare-passenger-reservation-item.component.css'
})
export class RidesharePassengerReservationItemComponent {
  @Input() rideshare!: RideSharePassengerList;
  isDialogVisible = false;

  constructor(private router: Router) {}

  onCheckDetails() {
    this.isDialogVisible = true;
  }

  onCloseDialog() {
    this.isDialogVisible = false;
    this.router.navigate(['/rideshares/passenger']);
  }
}

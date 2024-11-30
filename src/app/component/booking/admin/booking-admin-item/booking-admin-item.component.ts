import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DateFormatterPipe } from '../../../../pipe/date-formatter/date-formatter.pipe';
import { VehicleBookingList } from '../../../../models/vehicle-booking/vehicle-booking-list.model';

@Component({
  selector: 'app-booking-admin-item',
  standalone: true,
  imports: [CommonModule, DateFormatterPipe],
  templateUrl: './booking-admin-item.component.html',
  styleUrl: './booking-admin-item.component.css'
})
export class BookingAdminItemComponent {
  @Input() booking!: VehicleBookingList; 

}

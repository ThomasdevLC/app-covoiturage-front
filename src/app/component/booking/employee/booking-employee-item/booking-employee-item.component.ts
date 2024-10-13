import { Component, Input } from '@angular/core';
import { VehicleBooking } from '../../../../models/vehicle-booking.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../pipe/date-formatter/date-formatter.pipe';

@Component({
  selector: 'app-booking-employee-item',
  standalone: true,
  imports: [CommonModule, DateFormatterPipe ],
  templateUrl: './booking-employee-item.component.html',
  styleUrl: './booking-employee-item.component.css'
})
export class BookingEmployeeItemComponent {
  @Input() booking!: VehicleBooking;

constructor(private router: Router ){

}
onCheckDetails() {
  this.router.navigate(['/bookings/', this.booking.id]);

}
}

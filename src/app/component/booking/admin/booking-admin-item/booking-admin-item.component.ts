import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DateFormatterPipe } from '../../../../shared/pipe/date-formatter/date-formatter.pipe';
import { VehicleBookingList } from '../../../../models/vehicle-booking/vehicle-booking-list.model';
import { MotorPipe } from '../../../../shared/pipe/motor/motor.pipe';
import { VehicleCategoryPipe } from '../../../../shared/pipe/vehicle-category/vehicle-category.pipe';
import { VehicleStatusPipe } from '../../../../shared/pipe/vehicle-status/vehicle-status.pipe';

@Component({
  selector: 'app-booking-admin-item',
  standalone: true,
  imports: [CommonModule, DateFormatterPipe, MotorPipe, VehicleCategoryPipe, VehicleStatusPipe],
  templateUrl: './booking-admin-item.component.html',
  styleUrl: './booking-admin-item.component.css'
})
export class BookingAdminItemComponent {
  @Input() booking!: VehicleBookingList;

}

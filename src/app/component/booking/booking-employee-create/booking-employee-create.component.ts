import { Component, OnInit } from '@angular/core';
import { VehicleBooking } from '../../../models/vehicle-booking.model';
import { ActivatedRoute } from '@angular/router';
import { BookingEmployeeService } from '../../../service/booking/employee/booking-employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-employee-create',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-employee-create.component.html',
  styleUrl: './booking-employee-create.component.css',
})
export class BookingEmployeeCreateComponent implements OnInit {
  vehicleId: number | null = null;
  startTime: Date | null = null;
  endTime: Date | null = null;
  booking: VehicleBooking | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingEmployeeService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.vehicleId = +params['vehicleId'];

      this.startTime = params['startTime']
        ? new Date(params['startTime'])
        : null;
      this.endTime = params['endTime'] ? new Date(params['endTime']) : null;
    });
  }

  onCreateBooking(): void {
    if (this.vehicleId && this.startTime && this.endTime) {
      this.bookingService
        .createBooking(this.startTime, this.endTime, this.vehicleId)
        .subscribe({
          next: (response: VehicleBooking) => {
            console.log('Booking successful', response);
            this.booking = response;
          },
          error: (error: any) => {
            console.error('Booking failed', error);
          },
        });
    } else {
      console.error('Missing required parameters');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { VehicleBooking } from '../../../../models/vehicle-booking/vehicle-booking.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookingEmployeeService } from '../../../../service/booking/employee/booking-employee.service';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../shared/pipe/date-formatter/date-formatter.pipe';
import { CompanyVehicle } from '../../../../models/company-vehicle/company-vehicle.model';
import { CompanyVehicleEmployeeService } from '../../../../service/company-vehicle/employee/company-vehicle-employee.service';
import { ErrorHandlerService } from '../../../../shared/errors/error-handler.service';

@Component({
  selector: 'app-booking-employee-create',
  standalone: true,
  imports: [CommonModule, DateFormatterPipe, RouterLink],
  templateUrl: './booking-employee-create.component.html',
  styleUrl: './booking-employee-create.component.css',
})
export class BookingEmployeeCreateComponent implements OnInit {
  vehicle: CompanyVehicle | undefined;
  startTime?: string;
  endTime?: string;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: CompanyVehicleEmployeeService,
    private bookingEmployeeService: BookingEmployeeService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    const vehicleIdParam = this.route.snapshot.paramMap.get('id');
    const vehicleId = vehicleIdParam ? +vehicleIdParam : null;

    if (vehicleId !== null) {
      this.vehicleService.getVehicleById(vehicleId).subscribe({
        next: (vehicle) => {
          this.vehicle = vehicle;
        },
        error: (error) => {
          this.errorHandlerService.handleError(error);
        },
      });
    }
    this.route.queryParams.subscribe((params) => {
      this.startTime = params['startTime'];
      this.endTime = params['endTime'];
    });
  }


  confirmReservation(): void {
    if (this.vehicle) {
      const startTimeFormatted = new Date(this.startTime!).toISOString().slice(0, 19);
      const endTimeFormatted = new Date(this.endTime!).toISOString().slice(0, 19);

      const booking: VehicleBooking = {
        startTime: startTimeFormatted,
        endTime: endTimeFormatted,
        vehicle: this.vehicle,
      };

      this.bookingEmployeeService.createBooking(booking).subscribe({
        next: () => {
          this.router.navigate(['/bookings-list']);
        },
        error: (error) => {
          this.errorHandlerService.handleError(error);
        },
      });
    }
  }

}

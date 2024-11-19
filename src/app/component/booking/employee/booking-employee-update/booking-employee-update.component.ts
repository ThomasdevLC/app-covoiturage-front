import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { BookingEmployeeService } from '../../../../service/booking/employee/booking-employee.service';
import { VehicleBooking } from '../../../../models/vehicle-booking.model';
import { DateFormatterPipe } from "../../../../pipe/date-formatter/date-formatter.pipe";
import { ErrorHandlerService } from '../../../../service/shared/errors/error-handler.service';

@Component({
  selector: 'app-booking-employee-update',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, RouterLink, DateFormatterPipe],
  templateUrl: './booking-employee-update.component.html',
  styleUrl: './booking-employee-update.component.css'
})
export class BookingEmployeeUpdateComponent {

  @Input() booking!: VehicleBooking;
  errorMessage: string | undefined;

  constructor(
  private router: Router,
  private route: ActivatedRoute,
  private bookingEmployeeService: BookingEmployeeService,
  private errorHandlerService: ErrorHandlerService,
  ){
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getById(id);
    }
  }

  getById(id: number): void {
    this.bookingEmployeeService.getBookingById(id).subscribe({
      next: (booking) => {
        this.booking = booking;
      },
      error: (error) => {
        this.errorHandlerService.handleError(error); 
      },
    });
  }

  updateBooking(): void {
    this.bookingEmployeeService.updateBooking(this.booking).subscribe({
      next: () => {
        this.router.navigate(['/bookings-list']);
      },
      error: (error) => {
        this.errorHandlerService.handleError(error); 
      },
    });
  }

  
}

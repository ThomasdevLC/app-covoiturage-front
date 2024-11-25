import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VehicleBooking } from '../../../../models/vehicle-booking/vehicle-booking.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../pipe/date-formatter/date-formatter.pipe';
import { BookingEmployeeService } from '../../../../service/booking/employee/booking-employee.service';
import { ErrorHandlerService } from '../../../../service/shared/errors/error-handler.service';

@Component({
  selector: 'app-booking-employee-item',
  standalone: true,
  imports: [CommonModule, DateFormatterPipe ],
  templateUrl: './booking-employee-item.component.html',
  styleUrl: './booking-employee-item.component.css'
})
export class BookingEmployeeItemComponent {
  @Input() booking!: VehicleBooking;
  @Input() isPast: boolean = false;
  @Output() bookingDeleted = new EventEmitter<void>();
  errorMessage: string | undefined;

constructor(
  private router: Router,
  private bookingEmployeeService: BookingEmployeeService,
  private errorHandlerService: ErrorHandlerService,
){

}
onUpdateBooking() {
  this.router.navigate(['/bookings-update/', this.booking.id]);

}

deleteBooking(): void {
  if (this.booking && this.booking.id) {
    this.bookingEmployeeService.deleteBooking(this.booking.id).subscribe({
      next: () => {
        this.bookingDeleted.emit(); 
      },
      error: (error) => {
        this.errorHandlerService.handleError(error); 
      },
    });
  }
}

onCancelBooking(){
  this.router.navigate(['/bookings-list', this.booking.id]);
  }
}

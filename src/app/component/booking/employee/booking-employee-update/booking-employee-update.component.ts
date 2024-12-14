import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookingEmployeeService } from '../../../../service/booking/employee/booking-employee.service';
import { VehicleBooking } from '../../../../models/vehicle-booking/vehicle-booking.model';
import { ErrorHandlerService } from '../../../../shared/errors/error-handler.service';

@Component({
  selector: 'app-booking-employee-update',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './booking-employee-update.component.html',
  styleUrl: './booking-employee-update.component.css'
})
export class BookingEmployeeUpdateComponent {
  @Input() booking!: VehicleBooking;
  @Output() updateComplete = new EventEmitter<void>();
  @Output() cancelUpdate = new EventEmitter<void>();
  errorMessage: string | undefined;

  constructor(
    private router: Router,
    private bookingEmployeeService: BookingEmployeeService,
    private errorHandlerService: ErrorHandlerService,
  ) {
  }

  updateBooking(): void {
    this.bookingEmployeeService.updateBooking(this.booking).subscribe({
      next: () => {
        this.updateComplete.emit();
      },
      error: (error) => {
        this.errorHandlerService.handleError(error);
      },
    });
  }

  cancel(): void {
    this.cancelUpdate.emit();
  }
}

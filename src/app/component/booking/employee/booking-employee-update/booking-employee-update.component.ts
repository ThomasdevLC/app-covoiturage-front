import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {RouterModule } from '@angular/router';
import { BookingEmployeeService } from '../../../../service/booking/employee/booking-employee.service';
import { VehicleBooking } from '../../../../models/vehicle-booking/vehicle-booking.model';
import { ErrorHandlerService } from '../../../../shared/errors/error-handler.service';
import { CalendarModule } from 'primeng/calendar';
import { DateFormatterPipe } from '../../../../shared/pipe/date-formatter/date-formatter.pipe';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-booking-employee-update',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, CalendarModule, DateFormatterPipe, LucideAngularModule],
  templateUrl: './booking-employee-update.component.html',
  styleUrl: './booking-employee-update.component.css'
})
export class BookingEmployeeUpdateComponent {
  @Input() booking!: VehicleBooking;
  @Output() updateComplete = new EventEmitter<void>();
  @Output() cancelUpdate = new EventEmitter<void>();

  bookingForm: FormGroup;
  today: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private bookingEmployeeService: BookingEmployeeService,
    private errorHandlerService: ErrorHandlerService
  ) {
    this.bookingForm = this.fb.group({
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
    });
  }

  ngOnChanges(): void {
    if (this.booking) {
      this.bookingForm.patchValue({
        startTime: this.booking.startTime,
        endTime: this.booking.endTime,
      });
    }
  }

  updateBooking(): void {
    if (this.bookingForm.valid) {
      const updatedBooking = { ...this.booking, ...this.bookingForm.value };
      this.bookingEmployeeService.updateBooking(updatedBooking).subscribe({
        next: () => this.updateComplete.emit(),
        error: (error) => this.errorHandlerService.handleError(error),
      });
    }
  }

  cancel(): void {
    this.cancelUpdate.emit();
  }
}

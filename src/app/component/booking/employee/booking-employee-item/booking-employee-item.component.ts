import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VehicleBooking } from '../../../../models/vehicle-booking/vehicle-booking.model';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../shared/pipe/date-formatter/date-formatter.pipe';
import { BookingEmployeeService } from '../../../../service/booking/employee/booking-employee.service';
import { ErrorHandlerService } from '../../../../shared/errors/error-handler.service';
import { MotorPipe } from '../../../../shared/pipe/motor/motor.pipe';
import { VehicleCategoryPipe } from '../../../../shared/pipe/vehicle-category/vehicle-category.pipe';
import { VehicleStatusPipe } from '../../../../shared/pipe/vehicle-status/vehicle-status.pipe';
import { LucideAngularModule } from 'lucide-angular';
import { ConfirmDialogComponent } from '../../../../shared/lib/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-booking-employee-item',
  standalone: true,
  imports: [CommonModule, DateFormatterPipe, LucideAngularModule, ConfirmDialogComponent],
  templateUrl: './booking-employee-item.component.html',
  styleUrl: './booking-employee-item.component.css'
})
export class BookingEmployeeItemComponent {
  @Input() booking!: VehicleBooking;
  @Input() isPast: boolean = false;
  @Output() bookingDeleted = new EventEmitter<void>();
  @Output() modifyBooking = new EventEmitter<VehicleBooking>();
  errorMessage: string | undefined;

  isConfirmVisible: boolean = false;
  confirmationMessage: string = 'Êtes-vous sûr de vouloir supprimer cette réservation ?'
  confirmationConfirmText: string = 'Valider';
  confirmationCancelText: string = 'Annuler';

constructor(
  private bookingEmployeeService: BookingEmployeeService,
  private errorHandlerService: ErrorHandlerService,
){}

  showConfirmation(): void {
    this.isConfirmVisible = true;
  }
  onConfirmCancel(): void {
    this.deleteBooking();
  }
  onCancelCancel(): void {
    this.isConfirmVisible = false;
  }

onUpdateBooking() {
  this.modifyBooking.emit(this.booking);
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
}

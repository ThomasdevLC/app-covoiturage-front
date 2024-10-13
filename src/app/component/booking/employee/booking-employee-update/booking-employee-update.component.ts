import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { BookingEmployeeService } from '../../../../service/booking/employee/booking-employee.service';
import { VehicleBooking } from '../../../../models/vehicle-booking.model';
import { DateFormatterPipe } from "../../../../pipe/date-formatter/date-formatter.pipe";

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

  constructor(private router: Router, private route: ActivatedRoute, private bookingEmployeeService: BookingEmployeeService  ){
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
      error: (err) => {
        this.errorMessage = 'Erreur lors de la récupération de la réservation';
        console.error('Error retrieving booking:', err);
      }
    });
  }

  updateBooking(): void {
    this.bookingEmployeeService.updateBooking(this.booking).subscribe({
      next: (updatedBooking) => {
        console.log('Booking updated successfully', updatedBooking);
        this.router.navigate(['/bookings-list']);
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la mise à jour de la réservation';
        console.error('Error updating booking:', err);
      }
    });
  }

  
}

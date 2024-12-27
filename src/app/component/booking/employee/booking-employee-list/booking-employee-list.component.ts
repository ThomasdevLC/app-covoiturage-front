import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleBooking } from '../../../../models/vehicle-booking/vehicle-booking.model';
import { BookingEmployeeService } from '../../../../service/booking/employee/booking-employee.service';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../shared/pipe/date-formatter/date-formatter.pipe';
import { BookingEmployeeItemComponent } from "../booking-employee-item/booking-employee-item.component";
import {DialogModule} from "primeng/dialog";
import {BookingEmployeeUpdateComponent} from "../booking-employee-update/booking-employee-update.component";
import { LucideSharedModule } from '../../../../shared/icons/lucide-shared/lucide-shared.module';

@Component({
  selector: 'app-booking-employee-list',
  standalone: true,
  imports: [CommonModule, DialogModule,  BookingEmployeeItemComponent, BookingEmployeeUpdateComponent, LucideSharedModule],
  templateUrl: './booking-employee-list.component.html',
  styleUrl: './booking-employee-list.component.css',
})
export class BookingEmployeeListComponent implements OnInit {
  bookings$!: Observable<VehicleBooking[]>;
  past: boolean = false;
  displayUpdateDialog: boolean = false;
  selectedBooking!: VehicleBooking;

  constructor(private bookingEmployeeService: BookingEmployeeService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookings$ = this.bookingEmployeeService.getBookings(this.past);
  }

  toggleToCurrentBookings(): void {
    this.past = false;
    this.loadBookings();
  }

  toggleToPastBookings(): void {
    this.past = true;
    this.loadBookings();
  }


  openUpdateDialog(booking: VehicleBooking): void {
    this.selectedBooking = booking;
    this.displayUpdateDialog = true;
  }

  closeUpdateDialog(): void {
    this.displayUpdateDialog = false;
    this.selectedBooking = {} as VehicleBooking; // Réinitialiser la réservation sélectionnée
  }

  onBookingUpdated(): void {
    this.closeUpdateDialog();
    this.loadBookings();
  }
}

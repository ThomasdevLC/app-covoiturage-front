import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleBooking } from '../../../../models/vehicle-booking.model';
import { BookingEmployeeService } from '../../../../service/booking/employee/booking-employee.service';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../pipe/date-formatter/date-formatter.pipe';
import { BookingEmployeeItemComponent } from "../booking-employee-item/booking-employee-item.component";

@Component({
  selector: 'app-booking-employee-list',
  standalone: true,
  imports: [CommonModule, DateFormatterPipe, BookingEmployeeItemComponent],
  templateUrl: './booking-employee-list.component.html',
  styleUrl: './booking-employee-list.component.css',
})
export class BookingEmployeeListComponent implements OnInit {
  bookings$!: Observable<VehicleBooking[]>; // Observable pour les réservations
  past: boolean = false; // Paramètre `past` pour déterminer si on affiche les anciennes réservations

  constructor(private bookingEmployeeService: BookingEmployeeService) {}

  ngOnInit(): void {
    this.loadBookings(); // Charger les réservations à l'initialisation
  }

  // Fonction pour charger les réservations en fonction de `past`
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
  
}

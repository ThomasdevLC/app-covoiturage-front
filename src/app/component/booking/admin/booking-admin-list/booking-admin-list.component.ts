import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { BookingAdminServiceService } from '../../../../service/booking/admin/booking-admin.service';
import { VehicleBookingList } from '../../../../models/vehicle-booking/vehicle-booking-list.model';
import { ErrorHandlerService } from '../../../../shared/errors/error-handler.service';
import { BookingAdminItemComponent } from '../booking-admin-item/booking-admin-item.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-booking-admin-list',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BookingAdminItemComponent, LucideAngularModule,
  ],
  templateUrl: './booking-admin-list.component.html',
  styleUrl: './booking-admin-list.component.css'
})

export class BookingAdminListComponent implements OnInit {
  bookings: VehicleBookingList[] = [];
  bookingType: 'past' | 'now' | 'future' = 'past';
  errorMessage: string | null = null;

  constructor(
    private bookingAdminService: BookingAdminServiceService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  ngOnInit(): void {
    this.loadBookings(this.bookingType); // Charge les réservations au démarrage
  }

  loadBookings(type: 'past' | 'now' | 'future'): void {
    this.bookingAdminService.getBookingsByType(type).subscribe({
      next: (bookings) => {
        this.bookings = bookings; // Stocker les réservations dans la variable
      },
      error: (error) => {
        this.errorHandlerService.handleError(error);
      },
    });
  }

  onTypeChange(type: 'past' | 'now' | 'future'): void {
    this.bookingType = type; // Met à jour le type de réservation
    this.loadBookings(type); // Recharge les réservations en fonction du type sélectionné
  }

}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VehicleBooking } from '../../../models/vehicle-booking.model';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { CompanyVehicleAdminService } from '../../../service/company-vehicle/admin/company-vehicle-admin.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { catchError, of } from 'rxjs';
import { BookingAdminServiceService } from '../../../service/booking/admin/booking-admin.service';
import { VehicleBookingList } from '../../../models/vehicle-booking-list.model';

@Component({
  selector: 'app-booking-admin-list',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './booking-admin-list.component.html',
  styleUrl: './booking-admin-list.component.css'
})

export class BookingAdminListComponent implements OnInit {
  bookings: VehicleBookingList[] = [];
  bookingType: 'past' | 'now' | 'future' = 'future'; // Type de réservation par défaut
  errorMessage: string | null = null;

  constructor(
    private bookingAdminService: BookingAdminServiceService // Injection du service
  ) {}

  ngOnInit(): void {
    this.loadBookings(this.bookingType); // Charge les réservations au démarrage
  }

  loadBookings(type: 'past' | 'now' | 'future'): void {
    this.bookingAdminService.getBookingsByType(type).pipe(
      catchError((error) => {
        this.errorMessage = error; // Gérer l'erreur ici
        return of([]); // Retourne un tableau vide en cas d'erreur
      })
    ).subscribe((bookings) => {
      this.bookings = bookings; // Stocker les réservations dans la variable
      console.log(bookings); // Afficher les réservations dans la console
    });
  }

  onTypeChange(type: 'past' | 'now' | 'future'): void {
    this.bookingType = type; // Met à jour le type de réservation
    this.loadBookings(type); // Recharge les réservations en fonction du type sélectionné
  }
}
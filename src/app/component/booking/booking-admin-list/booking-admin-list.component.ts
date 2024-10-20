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

export class BookingAdminListComponent implements OnInit{
  vehicleId: number = 0;
  bookings: VehicleBooking[] = [];

  constructor(
    private route: ActivatedRoute,
    private companyVehicleAdminService: CompanyVehicleAdminService
  ) {}

  ngOnInit(): void {
    this.vehicleId = Number(this.route.snapshot.paramMap.get('id')); // Récupération de l'ID du véhicule
    this.loadBookings(); // Chargez les réservations
  }

  loadBookings(): void {
    this.companyVehicleAdminService.getBookingsByVehicleId(this.vehicleId).subscribe(bookings => {
      this.bookings = bookings;
    });
  }

}

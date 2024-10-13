import { Component, OnInit } from '@angular/core';
import { VehicleBooking } from '../../../../models/vehicle-booking.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingEmployeeService } from '../../../../service/booking/employee/booking-employee.service';
import { CommonModule } from '@angular/common';
import { CompanyVehicle } from '../../../../models/company-vehicle.model';
import { CompanyVehicleAdminService } from '../../../../service/company-vehicle/admin/company-vehicle-admin.service';
import { DateFormatterPipe } from '../../../../pipe/date-formatter/date-formatter.pipe';

@Component({
  selector: 'app-booking-employee-create',
  standalone: true,
  imports: [CommonModule, DateFormatterPipe],
  templateUrl: './booking-employee-create.component.html',
  styleUrl: './booking-employee-create.component.css',
})
export class BookingEmployeeCreateComponent implements OnInit {
  vehicle: CompanyVehicle | undefined;
  startTime?: string;
  endTime?: string;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: CompanyVehicleAdminService,
    private bookingEmployeeService: BookingEmployeeService
  ) {}

  ngOnInit(): void {
    const vehicleId = +this.route.snapshot.paramMap.get('id')!;

    this.route.queryParams.subscribe((params) => {
      this.startTime = params['startTime'];
      this.endTime = params['endTime'];
    });
    console.log("create: "+vehicleId+" start: "+this.startTime+" end: "+this.endTime);
    console.log("onInitcreate: "+vehicleId);
    this.vehicleService.getVehicleById(vehicleId).subscribe(
      (vehicle) => {
        this.vehicle = vehicle;
        console.log("vehiclecreate: "+this.vehicle);
      },
      (_error) => {
        this.errorMessage = 'Erreur lors du chargement des détails du véhicule';
      }
    );
  }

  confirmReservation(): void {
    if (this.vehicle) {
      const startTimeFormatted = new Date(this.startTime!)
        .toISOString()
        .slice(0, 19);
      const endTimeFormatted = new Date(this.endTime!)
        .toISOString()
        .slice(0, 19);

      const booking: VehicleBooking = {
        startTime: startTimeFormatted,
        endTime: endTimeFormatted,
        vehicle: this.vehicle,
        id: 0
      };

      this.bookingEmployeeService.createBooking(booking).subscribe(
        (result) => {
          console.log('Réservation réussie:', result);
          this.router.navigate(['/bookings-list']); 

        },
        (error) => {
          this.errorMessage = 'Erreur lors de la réservation du véhicule';
        }
      );
    }
  }
}

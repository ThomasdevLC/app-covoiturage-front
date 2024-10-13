import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { CompanyVehicleAdminService } from '../../../../service/company-vehicle/admin/company-vehicle-admin.service';
import { BookingEmployeeService } from '../../../../service/booking/employee/booking-employee.service';
import { EmployeeService } from '../../../../service/employee/employee.service';
import { VehicleBooking } from '../../../../models/vehicle-booking.model';
import { CompanyVehicle } from '../../../../models/company-vehicle.model';
import { DateFormatterPipe } from "../../../../pipe/date-formatter/date-formatter.pipe";

@Component({
  selector: 'app-booking-employee-update',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, RouterLink, DateFormatterPipe],
  templateUrl: './booking-employee-update.component.html',
  styleUrl: './booking-employee-update.component.css'
})
export class BookingEmployeeUpdateComponent {

  vehicle: CompanyVehicle | undefined;
  startTime?: string;
  endTime?: string;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private vehicleService: CompanyVehicleAdminService,
    private bookingEmployeeService: BookingEmployeeService,
    //private numEmployee: number,
    private employeeService: EmployeeService
  ) {}
  //
ngOnInit(){
  console.log("on init booking update");
}
  //
  deleteBooking(){
    console.log("delete booking");
  }
  /*
  updateBooking(): void {
    console.log("modifier reservation");
    if (this.bookingEmployeeService) {
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
          console.log('Modification réussie:', result);
        },
        (error) => {
          this.errorMessage = 'Erreur lors de la réservation du véhicule';
        }
      );
    }
  }*/
    updateBooking(): void {
      console.log("modifier reservation");
  
      // Vérifiez si `this.vehicle` est correctement défini avant de l'utiliser
      if (this.vehicle && this.bookingEmployeeService) {
        const startTimeFormatted = new Date(this.startTime!)
          .toISOString()
          .slice(0, 19);
        const endTimeFormatted = new Date(this.endTime!)
          .toISOString()
          .slice(0, 19);
  
        // Construction de l'objet booking avec les champs correctement définis
        const booking: VehicleBooking = {
          startTime: startTimeFormatted,
          endTime: endTimeFormatted,
          vehicle: this.vehicle,  // Assurez-vous que `this.vehicle` est correctement défini ici
          id: 0  // Vous pouvez remplacer par l'ID correct si nécessaire
        };
  
        // Appel du service pour mettre à jour la réservation
        this.bookingEmployeeService.updateBooking(booking).subscribe(
          (result) => {
            console.log('Modification réussie:', result);
          },
          (error) => {
            this.errorMessage = 'Erreur lors de la modification du véhicule';
          }
        );
      } else {
        // Ajoutez un message d'erreur si `this.vehicle` est indéfini
        console.error('Le véhicule est indéfini. Impossible de procéder à la modification.');
      }
    }
  
}

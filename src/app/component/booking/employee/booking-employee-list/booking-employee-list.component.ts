import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { CompanyVehicle } from '../../../../models/company-vehicle.model';
import { Employee } from '../../../../models/employee.model';
import { VehicleCategory } from '../../../../models/enums/vehicle-category.enum';
import { VehicleMotor } from '../../../../models/enums/vehicle-motor.enum';
import { VehicleStatus } from '../../../../models/enums/vehicle-status.enum';
import { CompanyVehicleAdminService } from '../../../../service/company-vehicle/admin/company-vehicle-admin.service';
import { BookingEmployeeService } from '../../../../service/booking/employee/booking-employee.service';
import { VehicleBooking } from '../../../../models/vehicle-booking.model';
import { EmployeeService } from '../../../../service/employee/employee.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-booking-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './booking-employee-list.component.html',
  styleUrl: './booking-employee-list.component.css'
})

export class BookingEmployeeListComponent implements OnInit{
  //vehicles: CompanyVehicle[] = [];
 // employeeId: number = 0;
  bookings: VehicleBooking[] =[];
  vehicleForm!: FormGroup;
  errorMessage: string | null = null;
  futureBookings: VehicleBooking[] = [];
  pastBookings: VehicleBooking[] = [];
  //employeeId: number | undefined = 0;

  constructor(
    private route: ActivatedRoute,
    private vehicleService: CompanyVehicleAdminService,
    private bookingEmployeeService: BookingEmployeeService,
    //private numEmployee: number,
    private employeeService: EmployeeService
  ) {}


  ngOnInit(): void {
    //pour recuperer  le num de l'utilisateur
    this.employeeService.currentUser$.pipe(
      take(1) // Prend la première valeur émise et complète l'observable
    ).subscribe(currentUser => {
      if (currentUser) {
        const employeeId = currentUser.id;
        //this.employeeId = currentUser.id;
        console.log("ID de l'utilisateur connecté :", employeeId);
  
        // Vous pouvez maintenant utiliser l'ID de l'utilisateur
        //this.getAllBookings(employeeId);
      } else {
        console.error("Utilisateur non authentifié.");
      }
    });
   
    //console.log("onInit company-vehicle-employee-list.component "+employeeId);
    //Pour afficher une liste de reservations(bookings)
    this.getAllBookings();
  }
  //employee/:id = id employee_courant -> 'vehicles-bookings/bookings-search/:id'
  getAllBookings(): void {
    const date = new Date();
    console.log("date: "+date.toISOString());//OK heure GMT -> ISO
    const jour = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    //const jour = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDay();Day=num jours semaine
    const heure = date.getHours()+":"+date.getMinutes();
    console.log("jour: "+jour+" à: "+heure);
    this.bookingEmployeeService
      .getAllBookings()//retirer this.bookings
      .subscribe((bookings) => {
        this.bookings = bookings;
      if(!bookings || bookings.length===0){
        console.log("Pas de réservations trouvées?");
        //
        this.errorMessage ="Aucune reservation trouvée!"
      }
      else {
        console.log("nb reservation: "+bookings.length);
        //extraire des infos de bookings
        for(let i =0;i<bookings.length;i++){
          console.log("bookings: "+bookings[i].vehicle.brand+"\n "+bookings[i].startTime+"\n "+bookings[i].endTime);
          //extraire les données de startTime et endTime pour verfiier si passees ou a venir
        }
    
      }
      },
      (error) => {
        console.log("erreur lors de la récuperation des réservations..");
        this.errorMessage="erreur lors de la récuperation des réservations..";
      }
    );
  }
  //
  deleteVehicleBooking(){
    console.log("delete booking -> Id???");
  }
  //

  //
}

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
  
  bookings: VehicleBooking[] =[];
  vehicleForm!: FormGroup;
  errorMessage: string | null = null;
  futureBookings: VehicleBooking[] = [];
  pastBookings: VehicleBooking[] = [];
  histo: boolean = false; //Pour la valeur de l'historique
 

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
  
    //Pour afficher une liste de reservations(bookings)
    this.getAllBookings();
  }
  //
  getAllBookings(): void {
    const date = new Date();
    const jour = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    const heure = date.getHours()+":"+date.getMinutes();
    this.bookingEmployeeService
      .getAllBookings()//retirer this.bookings
      .subscribe((bookings) => {
        this.bookings = bookings;
      if(!bookings || bookings.length===0){
        this.errorMessage ="Aucune reservation trouvée!"
      }
      else {
        for(let i =0;i<bookings.length;i++){
          //console.log("bookings: "+bookings[i].vehicle.brand+"\n "+bookings[i].startTime+"\n "+bookings[i].endTime);
          //extraire les données de startTime et endTime pour verfiier si passees ou a venir
          //pour les données de fin
          const anEnd = bookings[i].endTime.substring(0,4);
          const moisEnd = bookings[i].endTime.substring(5,7);
          const jourEnd = bookings[i].endTime.substring(8,10);
          const heureEnd = bookings[i].endTime.substring(11,13);
          const minEnd = bookings[i].endTime.substring(15,16);
          //pour le données de debut
          const anStart = bookings[i].startTime.substring(0,4);
          const moisStart = bookings[i].startTime.substring(5,7);
          const jourStart = bookings[i].startTime.substring(8,10);
          const heureStart = bookings[i].endTime.substring(11,13);
          const minStart = bookings[i].endTime.substring(15,16);
          //pour les données de la date
          const anSys = date.getFullYear();
          const moisSys = date.getMonth()+1;
          const jourSys = date.getDate();
          const heureSys = date.getHours();
          const minSys = date.getMinutes();
          
          if(anSys>parseInt(anEnd,10)){
            this.pastBookings.push(bookings[i]);
          }
          else if(anSys<parseInt(anEnd,10)){
            this.futureBookings.push(bookings[i]);
          }
          else if(anSys===parseInt(anEnd,10)){
              if(moisSys>parseInt(moisEnd,10)){
                this.pastBookings.push(bookings[i]);
              }
              else if(moisSys<parseInt(moisEnd,10)){
                this.futureBookings.push(bookings[i]);
              }
              else if(moisSys===parseInt(moisEnd,10)){
                if(jourSys>parseInt(jourEnd,10)){
                  this.pastBookings.push(bookings[i]);
                }
                else if(jourSys<parseInt(jourEnd,10)){
                  this.futureBookings.push(bookings[i]);
                }
                else if(jourSys===parseInt(jourEnd,10)){
                  this.futureBookings.push(bookings[i]);
                  //Ajouter traitement heures
                 if(heureSys>parseInt(heureEnd,10)){
                  this.pastBookings.push(bookings[i]);
                 }
                 else if(heureSys<parseInt(heureEnd,10)){
                  this.futureBookings.push(bookings[i]);
                 }
                 else if(heureSys===parseInt(heureEnd,10)){
                  if(minSys>parseInt(minEnd)){
                    this.pastBookings.push(bookings[i]);
                  }
                  else if(minSys<parseInt(minEnd)){
                    this.futureBookings.push(bookings[i]);
                  }
                  else if(minSys===parseInt(minEnd)){
                    this.futureBookings.push(bookings[i]);
                  }
                 }
                }
              }
          }
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
  deleteVehicleBooking(): void{
    console.log("delete booking -> Id???");
    if(this.bookings.length>0){
      //affichage id vehicle = OK
     
  }//fin if(bookings.length)
  else if(this.bookings.length==0){
    this.errorMessage=" Pas de réservation.";
  }
  }
  //
  afficherHistorique(){
    if(this.histo==false){
      this.histo=true;
    }
    else if(this.histo==true){
      this.histo=false;
    }
  }
  //
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SecureApiService } from '../../../../service/api/api-security/secure-api.service';
import { RideshareOrganizerService } from '../../../../service/rideshare/organizer/rideshare-organizer.service';
import { PrivateVehicleService } from '../../../../service/private-vehicle/private-vehicle.service';
import { ErrorHandlerService } from '../../../../service/shared/errors/error-handler.service';
import { CalendarModule } from 'primeng/calendar';
import { PrivateVehicle } from '../../../../models/private-vehicle/private-vehicle.model';
import { PostalCodeDirective } from '../../../../service/shared/directives/postal-code/postal-code.directive';
import { AddressCapitalizeDirective } from '../../../../service/shared/directives/address/address-capitalize.directive.spec';

@Component({
  selector: 'app-rideshare-organizer-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CalendarModule, PostalCodeDirective, AddressCapitalizeDirective],
  templateUrl: './rideshare-organizer-create.component.html',
  styleUrl: './rideshare-organizer-create.component.css',
})
export class RideshareOrganizerCreateComponent {
  rideShareForm: FormGroup;
  vehicles: PrivateVehicle[] = [];
  errorMessage: string = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private secureApiService: SecureApiService,
    private rideShareService: RideshareOrganizerService,
    private privateVehicleService: PrivateVehicleService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {
    // Initialisation du formulaire avec FormBuilder, ajout du champ vehicleId
    this.rideShareForm = this.formBuilder.group({
      departureTime: [new Date(), Validators.required],
      arrivalTime: [new Date(), Validators.required],
      departureAddress: this.formBuilder.group({
        number: [null, Validators.required],
        street: ['', Validators.required],
        code: ['', Validators.required],
        city: ['', Validators.required],
      }),
      arrivalAddress: this.formBuilder.group({
        number: [null, Validators.required],
        street: ['', Validators.required],
        code: ['', Validators.required],
        city: ['', Validators.required],
      }),
      availableSeats: [1, [Validators.required, Validators.min(1)]],
      vehicleId: [null, Validators.required],  // Ajout du champ vehicleId avec validation

      
    });
  }
  

  createNewRideShare() {
    if (this.rideShareForm.invalid) {
      console.error('Le formulaire est invalide');
      return;
    }

    this.secureApiService
      .getCurrentUser()
      .pipe(
        switchMap((currentUser) => { 
            const organizer = { id: currentUser.id };
            const newRideShare = {
              ...this.rideShareForm.value, 
              organizer,
              vehicle: { id: this.rideShareForm.value.vehicleId } 
            };
            return this.rideShareService.createRideShare(newRideShare);        
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Ride share created successfully:', response);
          this.router.navigate(['/rideshares/organizer']);
        },
        error: (error) => {
          this.errorHandlerService.handleError(error);
        },
      });
  }

  ngOnInit(): void {
    this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
          return this.privateVehicleService.getVehiclesByEmployeeId(currentUser.id);  
        
      })
    ).subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;  
        console.log('Véhicules récupérés avec succès :', vehicles);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des véhicules :', error);
        this.errorHandlerService.handleError(error);
      }
    });
  }
}

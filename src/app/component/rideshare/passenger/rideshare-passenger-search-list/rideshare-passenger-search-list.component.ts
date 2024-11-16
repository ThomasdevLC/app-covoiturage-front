import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RidesharePassengerSearchItemComponent } from '../rideshare-passenger-search-item/rideshare-passenger-search-item.component';
import { RidesharePassengerService } from '../../../../service/rideshare/passenger/rideshare-passenger.service';
import { RideSharePassengerList } from '../../../../models/rideshare/passenger/ridehare-passenger-list.model';
import { ErrorHandlerService } from '../../../../service/api/errors/error-handler.service';
import { Message, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ErrorToastComponent } from '../../../api/error-toast/error-toast.component';

@Component({
  selector: 'app-rideshare-passenger-search-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RidesharePassengerSearchItemComponent, ErrorToastComponent  ],  templateUrl: './rideshare-passenger-search-list.component.html',
  styleUrl: './rideshare-passenger-search-list.component.css'
})
export class RidesharePassengerSearchListComponent {
  rideshares: RideSharePassengerList[] = [];
  departureCity = '';
  arrivalCity = '';
  departureDateTime = '';

  // @ViewChild(ErrorToastComponent, { static: false }) errorToast!: ErrorToastComponent;


  constructor(
    private rideShareService: RidesharePassengerService,
    private route: ActivatedRoute,
    private router: Router,
    private errorHandlerService: ErrorHandlerService,
    private messageService: MessageService // Injectez le service ici
    

  ) {
    // Souscription aux paramètres de requête dans le constructeur
    this.route.queryParams.subscribe((params) => {
      this.departureCity = params['departureCity'] || '';
      this.arrivalCity = params['arrivalCity'] || '';
      this.departureDateTime = params['departureDateTime'] || '';
    });
  }

  searchRideShares(): void {
    // Si tous les champs sont vides, réinitialiser les covoiturages
    if (!this.departureCity && !this.arrivalCity && !this.departureDateTime) {
      this.rideshares = [];
      return;
    }

    // Demande pour obtenir les covoiturages
    this.rideShareService
    .getRideShares(this.departureCity, this.arrivalCity, this.departureDateTime)
    .subscribe({
      next: (rideshares: RideSharePassengerList[]) => {
        this.rideshares = rideshares;
        console.log('Covoiturages récupérés:', this.rideshares);
      },
      error: (error) => {
        this.errorHandlerService.handleError(error).subscribe({
          next: (errorObject) => {
            this.messageService.add({
              severity: 'warn',
              detail: errorObject.message,
              life: 4000, 
            });
          },
        });
      },
    });

}



  clearSearch(): void {
    this.departureCity = '';
    this.arrivalCity = '';
    this.departureDateTime = '';
    this.rideshares = []; 
  }
}

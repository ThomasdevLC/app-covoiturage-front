import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { RidesharePassengerSearchItemComponent } from '../rideshare-passenger-search-item/rideshare-passenger-search-item.component';
import { RidesharePassengerService } from '../../../../service/rideshare/passenger/rideshare-passenger.service';
import { RideSharePassengerList } from '../../../../models/rideshare/passenger/ridehare-passenger-list.model';
import { ErrorHandlerService } from '../../../../shared/errors/error-handler.service';
import { CalendarModule } from 'primeng/calendar';
import { CapitalizeDirective } from '../../../../shared/directives/capitalize/capitalize.directive';
import {DialogModule} from "primeng/dialog";
import {
  RidesharePassengerReservationAddComponent
} from "../rideshare-passenger-reservation-add/rideshare-passenger-reservation-add.component";
import {LucideAngularModule} from "lucide-angular";
import {LucideSharedModule} from "../../../../shared/icons/lucide-shared/lucide-shared.module";

@Component({
  selector: 'app-rideshare-passenger-search-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DialogModule,LucideSharedModule, RidesharePassengerSearchItemComponent, RidesharePassengerReservationAddComponent,
    CalendarModule, CapitalizeDirective, LucideAngularModule],
  templateUrl: './rideshare-passenger-search-list.component.html',
  styleUrl: './rideshare-passenger-search-list.component.css'
})
export class RidesharePassengerSearchListComponent {
  rideshares: RideSharePassengerList[] = [];
  departureCity = '';
  arrivalCity = '';
  departureDateTime = '';
  displayDialog: boolean = false;
  selectedRideShareId!: number;
  isLoading: boolean = false;


  constructor(
    private rideShareService: RidesharePassengerService,
    private errorHandlerService: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    // Souscription aux paramètres de requête dans le constructeur
    this.route.queryParams.subscribe((params) => {
      this.departureCity = params['departureCity'] || '';
      this.arrivalCity = params['arrivalCity'] || '';
      this.departureDateTime = params['departureDateTime'] || '';
    });
  }

  searchRideShares(): void {
    this.isLoading = true;
    setTimeout(() => {
      if (!this.departureCity && !this.arrivalCity && !this.departureDateTime) {
        this.rideshares = [];
        return;
      }

      let formattedDateTime = '';
      if (this.departureDateTime) {
        formattedDateTime = new Date(this.departureDateTime).toISOString();
      }

      this.rideShareService
        .getRideShares(this.departureCity, this.arrivalCity, formattedDateTime)
        .subscribe({
          next: (rideshares: RideSharePassengerList[]) => {
            this.rideshares = rideshares;
            this.isLoading = false;
            },
          error: (error) => {
            this.errorHandlerService.handleError(error);
            this.isLoading = false
          },
        });
    }, 1000);
  }

  clearSearch(): void {
    this.departureCity = '';
    this.arrivalCity = '';
    this.departureDateTime = '';
    this.rideshares = [];
  }
  openReservationDialog(rideshare: RideSharePassengerList): void {
    this.selectedRideShareId = rideshare.id;
    this.displayDialog = true;
  }

  onReservationSuccess(): void {
    this.displayDialog = false;
    this.searchRideShares();
    this.router.navigate(['/rideshares/passenger']);
  }
}

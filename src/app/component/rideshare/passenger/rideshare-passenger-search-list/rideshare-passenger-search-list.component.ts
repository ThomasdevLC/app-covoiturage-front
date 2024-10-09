import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RideShare } from '../../../../models/rideshare/rideshare.model';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RidesharePassengerSearchItemComponent } from '../rideshare-passenger-search-item/rideshare-passenger-search-item.component';
import { RidesharePassengerService } from '../../../../service/rideshare/passenger/rideshare-passenger.service';

@Component({
  selector: 'app-rideshare-passenger-search-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RidesharePassengerSearchItemComponent ],  templateUrl: './rideshare-passenger-search-list.component.html',
  styleUrl: './rideshare-passenger-search-list.component.css'
})
export class RidesharePassengerSearchListComponent {
  rideshares: RideShare[] = [];
  departureCity = '';
  arrivalCity = '';
  departureDateTime = '';

  constructor(
    private rideShareService: RidesharePassengerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Souscription aux paramètres de requête dans le constructeur
    this.route.queryParams.subscribe((params) => {
      this.departureCity = params['departureCity'] || '';
      this.arrivalCity = params['arrivalCity'] || '';
      this.departureDateTime = params['departureDateTime'] || '';

      this.searchRideShares(); // Effectuer la recherche initiale
    });
  }

  onInputChange(): void {
    // Déclencher la recherche si au moins un champ est rempli
    if (this.departureCity || this.arrivalCity || this.departureDateTime) {
      this.searchRideShares();
    } else {
      this.rideshares = []; // Effacer les résultats si tous les champs sont vides
    }
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
        next: (rideshares: RideShare[]) => (this.rideshares = rideshares),
        error: (err) => console.error('Erreur lors de la récupération des covoiturages:', err),
      });
  }
}
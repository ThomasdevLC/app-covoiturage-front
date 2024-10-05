import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RideShare } from '../../../../models/rideshare/rideshare.model';
import { RideShareService } from '../../../../service/rideshare/rideshare.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RidesharePassengerItemComponent } from '../rideshare-passenger-item/rideshare-passenger-item.component'; 
@Component({
  selector: 'app-rideshare-searchlist',
  standalone: true,
  imports: [CommonModule, FormsModule, RidesharePassengerItemComponent ],
  templateUrl: './rideshare-searchlist.component.html',
  styleUrl: './rideshare-searchlist.component.css',
})
export class RideshareSearchlistComponent implements OnInit {
  rideshares: RideShare[] = [];
  departureCity: string = '';
  arrivalCity: string = '';
  departureDateTime: string = '';

  constructor(
    private rideShareService: RideShareService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Charger les paramètres de requête initiaux depuis l'URL
    this.route.queryParams.subscribe((params) => {
      this.departureCity = params['departureCity'] || '';
      this.arrivalCity = params['arrivalCity'] || '';
      this.departureDateTime = params['departureDateTime'] || '';

      // Effectuer une recherche initiale si les paramètres sont fournis
      this.searchRideShares(false);
    });
  }

  // Méthode déclenchée à chaque modification d'un input
  onInputChange(): void {
    this.searchRideShares(false); // Appeler la recherche sans mise à jour d'URL pour éviter d'envoyer trop de requêtes
  }

  // Fonction de recherche des covoiturages
  searchRideShares(updateUrl: boolean = true): void {
    let startTimeFormatted: string | undefined = undefined;

    if (this.departureDateTime) {
      const parsedDate = new Date(this.departureDateTime);
      if (!isNaN(parsedDate.getTime())) {
        startTimeFormatted = parsedDate.toISOString().slice(0, 19);
      } else {
        console.error('Format de date invalide:', this.departureDateTime);
      }
    }

    // Requête pour obtenir les covoiturages
    this.rideShareService
      .getRideShares(this.departureCity, this.arrivalCity, startTimeFormatted)
      .subscribe({
        next: (rideshares: RideShare[]) => (this.rideshares = rideshares),
        error: (err) =>
          console.error(
            'Erreur lors de la récupération des covoiturages:',
            err
          ),
      });

    // Mise à jour de l'URL si nécessaire
    if (updateUrl) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          departureCity: this.departureCity || null,
          arrivalCity: this.arrivalCity || null,
          departureDateTime: startTimeFormatted || null,
        },
        queryParamsHandling: 'merge',
      });
    }
  }
}

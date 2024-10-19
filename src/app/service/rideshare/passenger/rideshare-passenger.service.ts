import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { SecureApiService } from '../../api/secure-api.service';
import { RideSharePassengerDetails } from '../../../models/rideshare/passenger/rideshare-passenger-details.model';
import { RideSharePassengerList } from '../../../models/rideshare/passenger/ridehare-passenger-list.model';

@Injectable({
  providedIn: 'root'
})
export class RidesharePassengerService {
  private apiURL = environment.apiURL;
  private ridesharesSubject = new BehaviorSubject<RideSharePassengerList[]>([]);
  rideshares$ = this.ridesharesSubject.asObservable();

  private passengerRideSharesSubject = new BehaviorSubject<RideSharePassengerDetails[]>([]);
  passengerRideShares$ = this.passengerRideSharesSubject.asObservable();

  past$ = new BehaviorSubject<boolean>(false); //  BehaviorSubject pour rendre `past` réactif

  constructor(
    private http: HttpClient,
    private secureApiService: SecureApiService,
  ) {}


  getRideShares(
    departureCity?: string,
    arrivalCity?: string,
    departureDateTime?: string
  ): Observable<RideSharePassengerList[]> {
    let params = new HttpParams();
    if (departureCity) params = params.set('departureCity', departureCity);
    if (arrivalCity) params = params.set('arrivalCity', arrivalCity);
    if (departureDateTime)
      params = params.set('departureDateTime', departureDateTime);

    return this.http.get<RideSharePassengerList[]>(`${this.apiURL}rideshares/search`, {
      params,
      headers: this.secureApiService.getHeaders(),
    });
  }

  joinAsPassenger(rideShareId: number): Observable<any> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        const userId = currentUser.id; 
        return this.http.post<any>(`${this.apiURL}rideshares/${rideShareId}/add-passenger/${userId}`, {}, {
          headers: this.secureApiService.getHeaders(),
        });
        
      }),
      tap((details: RideSharePassengerDetails[]) => {
        this.passengerRideSharesSubject.next(details);  // Met à jour l'état du BehaviorSubject
      })
    );
  }

loadPassengerRideShares(past: boolean): Observable<RideSharePassengerDetails[]> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        const userId = currentUser.id;
        return this.http.get<RideSharePassengerDetails[]>(`${this.apiURL}rideshares/passenger/${userId}?past=${past}`, {
          headers: this.secureApiService.getHeaders(),
        });
      }),   
    );
  }

  // Annuler la participation du passager et mettre à jour le BehaviorSubject
  cancelAsPassenger(rideShareId: number): Observable<any> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        const userId = currentUser.id;
        return this.http.delete<any>(`${this.apiURL}rideshares/${rideShareId}/cancel-passenger/${userId}`, {
          headers: this.secureApiService.getHeaders(),
        });
      }),
      tap(() => {
        // Met à jour le BehaviorSubject en supprimant le trajet annulé
        const updatedRideShares = this.passengerRideSharesSubject.value.filter(
          rideShare => rideShare.id !== rideShareId
        );
        this.passengerRideSharesSubject.next(updatedRideShares);  // Met à jour l'état
      })
    );
  }


  getRideShareById(id: number): Observable<RideSharePassengerDetails> {
    return this.http.get<RideSharePassengerDetails>(`${this.apiURL}rideshares/${id}`, {
      headers: this.secureApiService.getHeaders(),
    });
  }

  setPast(value: boolean) {
    this.past$.next(value); // Méthode pour changer la valeur de `past`
  }

}

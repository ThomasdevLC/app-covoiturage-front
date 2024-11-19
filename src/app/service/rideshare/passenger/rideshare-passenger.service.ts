import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { SecureApiService } from '../../api/api-security/secure-api.service';
import { RideSharePassengerDetails } from '../../../models/rideshare/passenger/rideshare-passenger-details.model';
import { RideSharePassengerList } from '../../../models/rideshare/passenger/ridehare-passenger-list.model';

@Injectable({
  providedIn: 'root'
})
export class RidesharePassengerService {
  private apiURL = environment.apiURL;

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
    });
  }

  joinAsPassenger(rideShareId: number): Observable<any> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        const userId = currentUser.id; 
        return this.http.post<any>(`${this.apiURL}rideshares/${rideShareId}/add-passenger/${userId}`, {}, 
        );
      })
    );
  }

  loadPassengerRideShares(past: boolean): Observable<RideSharePassengerList[]> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        const userId = currentUser.id;
        return this.http.get<RideSharePassengerList[]>(`${this.apiURL}rideshares/passenger/${userId}?past=${past}`, {
        });
      })
    );
  }

  cancelAsPassenger(rideShareId: number): Observable<any> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        const userId = currentUser.id;
        return this.http.delete<any>(`${this.apiURL}rideshares/${rideShareId}/cancel-passenger/${userId}`, {
        });
      })
    );
  }

  getRideShareById(id: number): Observable<RideSharePassengerDetails> {
    return this.http.get<RideSharePassengerDetails>(`${this.apiURL}rideshares/${id}`, {
    });
  }



  setPast(value: boolean) {
    this.past$.next(value); // Méthode pour changer la valeur de `past`
  }

}

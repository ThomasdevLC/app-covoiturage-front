import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { RideShare } from '../../../models/rideshare/rideshare.model';
import { SecureApiService } from '../../api/secure-api.service';

@Injectable({
  providedIn: 'root'
})
export class RidesharePassengerService {
  private apiURL = environment.apiURL;
  private ridesharesSubject = new BehaviorSubject<RideShare[]>([]);
  rideshares$ = this.ridesharesSubject.asObservable();
  past$ = new BehaviorSubject<boolean>(false); //  BehaviorSubject pour rendre `past` réactif

  constructor(
    private http: HttpClient,
    private secureApiService: SecureApiService,
  ) {}


  getRideShares(
    departureCity?: string,
    arrivalCity?: string,
    departureDateTime?: string
  ): Observable<RideShare[]> {
    let params = new HttpParams();
    if (departureCity) params = params.set('departureCity', departureCity);
    if (arrivalCity) params = params.set('arrivalCity', arrivalCity);
    if (departureDateTime)
      params = params.set('departureDateTime', departureDateTime);

    return this.http.get<RideShare[]>(`${this.apiURL}rideshares/search`, {
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
      })
    );
  }

  cancelAsPassenger(rideShareId: number): Observable<any> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        const userId = currentUser.id; 
        return this.http.delete<any>(`${this.apiURL}rideshares/${rideShareId}/cancel-passenger/${userId}`, {
          headers: this.secureApiService.getHeaders(),
        });
      })
    );
  }


  loadPassengerRideShares(past: boolean): Observable<RideShare[]> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        const userId = currentUser.id; 
        return this.http.get<RideShare[]>(`${this.apiURL}rideshares/passenger/${userId}?past=${past}`, {
          headers: this.secureApiService.getHeaders(),
        });
      })
    );
  }

  getRideShareById(id: number): Observable<RideShare> {
    return this.http.get<RideShare>(`${this.apiURL}rideshares/${id}`, {
      headers: this.secureApiService.getHeaders(),
    });
  }

  setPast(value: boolean) {
    this.past$.next(value); // Méthode pour changer la valeur de `past`
  }

}

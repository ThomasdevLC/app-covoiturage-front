import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { RideShare } from '../../models/rideshare/rideshare.model';
import { environment } from '../../../environments/environment';
import { SecureApiService } from '../api/secure-api.service';
import { RideShareCreate } from '../../models/rideshare/rideshare-create.model';

@Injectable({
  providedIn: 'root',
})
export class RideShareService {
  private apiURL = environment.apiURL;
  private ridesharesSubject = new BehaviorSubject<RideShare[]>([]);
  rideshares$ = this.ridesharesSubject.asObservable();

  constructor(
    private http: HttpClient,
    private secureApiService: SecureApiService
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

  getRideShareById(id: number): Observable<RideShare> {
    return this.http.get<RideShare>(`${this.apiURL}rideshares/${id}`, {
      headers: this.secureApiService.getHeaders(),
    });
  }

  createRideShare(rideShare: RideShareCreate): Observable<RideShareCreate> {
    return this.http.post<RideShareCreate>(
      `${this.apiURL}rideshares`,
      rideShare,
      {
        headers: this.secureApiService.getHeaders(),
      }
    );
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
}


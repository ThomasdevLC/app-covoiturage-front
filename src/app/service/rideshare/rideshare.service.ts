import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { RideShare } from '../../models/rideshare.model';
import { environment } from '../../../environments/environment';
import { SecureApiService } from '../api/secure-api.service';

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
    departureTime?: string
  ): Observable<RideShare[]> {
    let params = new HttpParams();
    if (departureCity) params = params.set('departureCity', departureCity);
    if (arrivalCity) params = params.set('arrivalCity', arrivalCity);
    if (departureTime) params = params.set('departureTime', departureTime);

    return this.http.get<RideShare[]>(`${this.apiURL}rideshares/search`, {
      params,
      headers: this.secureApiService.getHeaders(),
    });
  }

  getRideShareById(id: number): Observable<RideShare> {
    return this.http.get<RideShare>(`${this.apiURL}/${id}`, {
      headers: this.secureApiService.getHeaders(),
    });
  }
}

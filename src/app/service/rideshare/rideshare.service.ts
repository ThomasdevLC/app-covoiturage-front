import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { RideShare } from '../../models/rideshare.model';

@Injectable({
  providedIn: 'root',
})
export class RideShareService {
  private apiURL = 'http://localhost:8080/rideshares';
  private ridesharesSubject = new BehaviorSubject<RideShare[]>([]);
  rideshares$ = this.ridesharesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getRideShares(
    departureCity?: string,
    arrivalCity?: string,
    departureTime?: string
  ): Observable<RideShare[]> {
    let params = new HttpParams();
    if (departureCity) params = params.set('departureCity', departureCity);
    if (arrivalCity) params = params.set('arrivalCity', arrivalCity);
    if (departureTime) {
      params = params.set('departureTime', departureTime);
    }

    return this.http.get<RideShare[]>(`${this.apiURL}/search`, { params });
  }

  getRideShareById(id: number): Observable<RideShare> {
    return this.http.get<RideShare>(`${this.apiURL}/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { SecureApiService } from '../../api/secure-api.service';
import { RideShare } from '../../../models/rideshare/rideshare.model';
import { BehaviorSubject, Observable, switchMap, } from 'rxjs';
import { RideShareCreate } from '../../../models/rideshare/rideshare-create.model';

@Injectable({
  providedIn: 'root'
})
export class RideshareOrganizerService {
  private apiURL = environment.apiURL;
  private ridesharesSubject = new BehaviorSubject<RideShare[]>([]);
  rideshares$ = this.ridesharesSubject.asObservable();

  constructor(
    private http: HttpClient,
    private secureApiService: SecureApiService,
  ) {}


  createRideShare(rideShare: RideShareCreate): Observable<RideShareCreate> {
    return this.http.post<RideShareCreate>(
      `${this.apiURL}rideshares`,
      rideShare,
      {
        headers: this.secureApiService.getHeaders(),
      }
    );
  }

  loadOrganizerRideShares(past: boolean): Observable<RideShare[]> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        const userId = currentUser.id; 
        return this.http.get<RideShare[]>(`${this.apiURL}rideshares/organizer/${userId}?past=${past}`, {
          headers: this.secureApiService.getHeaders(),
        });
      })
    );
  }

  updateRideShare(id: number, updatedData: Partial<RideShareCreate>): Observable<RideShareCreate> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        const userId = currentUser.id;
           return this.http.post<RideShareCreate>(
          `${this.apiURL}rideshares/update/${id}?organizerId=${userId}`,
          updatedData,
          {
            headers: this.secureApiService.getHeaders(),
          }
        );
      })
    );
  }

  getRideShareById(id: number): Observable<RideShareCreate> {
    return this.http.get<RideShareCreate>(`${this.apiURL}rideshares/${id}`, {
      headers: this.secureApiService.getHeaders(),
    });
  }
}

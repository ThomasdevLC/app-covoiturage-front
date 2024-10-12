import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { SecureApiService } from '../../api/secure-api.service';
import { RideShare } from '../../../models/rideshare/rideshare.model';
import { BehaviorSubject, Observable, switchMap, tap, } from 'rxjs';
import { RideShareCreate } from '../../../models/rideshare/rideshare-create.model';
import { RideShareUpdate } from '../../../models/rideshare/rideshare-update.model';

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

  updateRideShare(id: number, updatedData: Partial<RideShareUpdate>): Observable<RideShareUpdate> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        const userId = currentUser.id;
           return this.http.put<RideShareUpdate>(
          `${this.apiURL}rideshares/update/${id}?organizerId=${userId}`,
          updatedData,
          {
            headers: this.secureApiService.getHeaders(),
          }
        );
      })
    );
  }

  getRideShareById(id: number): Observable<RideShare> {
    return this.http.get<RideShare>(`${this.apiURL}rideshares/${id}`, {
      headers: this.secureApiService.getHeaders(),
    });
  }


  deleteRideShare(id: number): Observable<RideShare> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        const organizerId = currentUser.id;
        return this.http.delete<RideShare>(
          `${this.apiURL}rideshares/${id}/delete/${organizerId}`,
          {
            headers: this.secureApiService.getHeaders(),
          }
        );
      }),
      tap(() => {
        this.ridesharesSubject.next(
          this.ridesharesSubject.getValue().filter(ride => ride.id !== id)
        );
      })
    );
  }
  
}
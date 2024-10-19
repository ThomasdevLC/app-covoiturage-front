import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { SecureApiService } from '../../api/secure-api.service';
import { RideShare } from '../../../models/rideshare/rideshare.model';
import { BehaviorSubject, Observable, switchMap, tap, } from 'rxjs';
import { RideShareCreate } from '../../../models/rideshare/rideshare-create.model';
import { RideShareUpdate } from '../../../models/rideshare/rideshare-update.model';
import { RideShareOrganizerList } from '../../../models/rideshare/organizer/rideshare-organizer-list.model';
import { RideShareOrganizerDetails } from '../../../models/rideshare/organizer/rideshare-organizer-details.model';

@Injectable({
  providedIn: 'root'
})
export class RideshareOrganizerService {
  private apiURL = environment.apiURL;

  private ridesharesSubject = new BehaviorSubject<RideShareOrganizerList[]>([]);
  rideshares$ = this.ridesharesSubject.asObservable();

  past$ = new BehaviorSubject<boolean>(false); // BehaviorSubject pour rendre `past` réactif

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

  loadOrganizerRideShares(past: boolean): Observable<RideShareOrganizerList[]> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        const userId = currentUser.id; 
        return this.http.get<RideShareOrganizerList[]>(`${this.apiURL}rideshares/organizer/${userId}?past=${past}`, {
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

  getRideShareById(id: number): Observable<RideShareOrganizerDetails> {
    return this.http.get<RideShareOrganizerDetails>(`${this.apiURL}rideshares/${id}`, {
      headers: this.secureApiService.getHeaders(),
    });
  }

  getRideShareByIdForUpdate(id: number): Observable<RideShareUpdate> {
    return this.http.get<RideShareUpdate>(`${this.apiURL}rideshares/${id}`, {
      headers: this.secureApiService.getHeaders(),
    });
  }


  deleteRideShare(id: number): Observable<RideShareOrganizerList> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        const organizerId = currentUser.id;
        return this.http.delete<RideShareOrganizerList>(
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

  setPast(value: boolean) {
    this.past$.next(value); // Méthode pour changer la valeur de `past`
  }
  
}
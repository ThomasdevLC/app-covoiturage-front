import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, map, Observable, switchMap, tap, } from 'rxjs';
import { RideShareOrganizerList } from '../../../models/rideshare/organizer/rideshare-organizer-list.model';
import { RideShareOrganizerDetails } from '../../../models/rideshare/organizer/rideshare-organizer-details.model';
import { RideShareOrganizerCreate } from '../../../models/rideshare/organizer/rideshare-organizer-create.model';
import { RideShareOrganizerUpdate } from '../../../models/rideshare/organizer/rideshare-organizer-update.model';
import { SecureApiService } from '../../api/api-security/secure-api.service';


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


  createRideShare(rideShare: RideShareOrganizerCreate): Observable<RideShareOrganizerCreate> {
    return this.http.post<RideShareOrganizerCreate>(
      `${this.apiURL}rideshares`,
      rideShare
    );
  }

  loadOrganizerRideShares(past: boolean): Observable<RideShareOrganizerList[]> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        const userId = currentUser.id;
        return this.http.get<RideShareOrganizerList[]>(
          `${this.apiURL}rideshares/organizer/${userId}?past=${past}`,      
        );
      })
    );
  }
  

  updateRideShare(id: number, updatedData: RideShareOrganizerUpdate): Observable<RideShareOrganizerUpdate> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        const userId = currentUser.id;
        const updatedRideShare = {
          ...updatedData,
          organizer: { id: userId },
        };
        return this.http.put<RideShareOrganizerUpdate>(
          `${this.apiURL}rideshares/update/${id}?organizerId=${userId}`,
          updatedRideShare,      
        );
      })
    );
  }
  

  getRideShareById(id: number): Observable<RideShareOrganizerDetails> {
    return this.http.get<RideShareOrganizerDetails>(`${this.apiURL}rideshares/${id}`
    );
  }

  getRideShareByIdForUpdate(id: number): Observable<RideShareOrganizerUpdate> {
    return this.http.get<RideShareOrganizerUpdate>(`${this.apiURL}rideshares/${id}`)
    .pipe(
      tap((rideShare) => {
        console.log('Fetched update RideShare:', rideShare);
      })
    );
 
  }


  deleteRideShare(id: number): Observable<RideShareOrganizerList> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        const organizerId = currentUser.id;
        return this.http.delete<RideShareOrganizerList>(
          `${this.apiURL}rideshares/${id}/delete/${organizerId}`
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
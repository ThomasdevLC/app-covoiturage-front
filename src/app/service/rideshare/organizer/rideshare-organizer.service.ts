import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { SecureApiService } from '../../api/secure-api.service';
import { RideShare } from '../../../models/rideshare/rideshare.model';
import { BehaviorSubject, Observable, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RideshareOrganizerService {
  private apiURL = environment.apiURL;

  constructor(
    private http: HttpClient,
    private secureApiService: SecureApiService
  ) {}


  loadOrganizerRideShares(past: boolean): Observable<RideShare[]> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        if (currentUser) {
          const userId = currentUser.id;
          console.log('userId', userId);
          return this.http.get<RideShare[]>(
            `${this.apiURL}rideshares/organizer/${userId}?past=${past}`,
            {
              headers: this.secureApiService.getHeaders(),
            }
          );
        } else {
          return throwError('Utilisateur non authentifié');
        }
      })
    );
  }
}








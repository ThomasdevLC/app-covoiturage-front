import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { VehicleBooking } from '../../../models/vehicle-booking.model';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { SecureApiService } from '../../api/secure-api.service';

@Injectable({
  providedIn: 'root'
})
export class BookingAdminServiceService {

  private apiURL = environment.apiURL;

  constructor(
    private http: HttpClient,
    private secureApiService: SecureApiService) { }

    getBookingsByType( type: 'past' | 'now' | 'future'): Observable<VehicleBooking[]> {
      return this.secureApiService.getCurrentUser().pipe(
        switchMap((currentUser) => {
          if (currentUser) {
            const url = `${this.apiURL}vehicle-bookings/search?type=${type}&employeeId=${currentUser.id}`;
            
            return this.http.get<VehicleBooking[]>(url, {
              headers: this.secureApiService.getHeaders(),
            }).pipe(
              catchError((error) => {
                return throwError('Erreur lors de la récupération des réservations');
              })
            );
          } else {
            return throwError('Utilisateur non authentifié');
          }
        })
      );
    }
    
    
   
}
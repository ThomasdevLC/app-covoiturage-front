import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { SecureApiService } from '../../api/api-security/secure-api.service';
import { VehicleBookingList } from '../../../models/vehicle-booking/vehicle-booking-list.model';

@Injectable({
  providedIn: 'root'
})
export class BookingAdminServiceService {

  private apiURL = environment.apiURL;

  constructor(
    private http: HttpClient,
    private secureApiService: SecureApiService) { }

    getBookingsByType(type: 'past' | 'now' | 'future'): Observable<VehicleBookingList[]> {
      return this.secureApiService.getCurrentUser().pipe(
        switchMap((currentUser) => {
            const url = `${this.apiURL}vehicle-bookings/admin/search?type=${type}&employeeId=${currentUser.id}`;
            
            return this.http.get<VehicleBookingList[]>(url 
            ).pipe(
              catchError((error) => {
                return throwError(() => new Error('Erreur lors de la récupération des réservations'));
              })
            );        
        })
      );
    }
  }
    
   


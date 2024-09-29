import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { VehicleBooking } from '../../../models/vehicle-booking.model';
import { Observable, switchMap, throwError } from 'rxjs';
import { SecureApiService } from '../../api/secure-api.service';

@Injectable({
  providedIn: 'root',
})
export class BookingEmployeeService {
  private apiURL = environment.apiURL;

  constructor(
    private http: HttpClient,
    private secureApiService: SecureApiService
  ) {}

  createBooking(booking: VehicleBooking): Observable<VehicleBooking> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        if (currentUser) {
          const employeeId = { id: currentUser.id };

          const bookingToPost = {
            ...booking,
            employee: employeeId,
            companyVehicle: { id: booking.vehicle.id },
          };

          return this.http.post<VehicleBooking>(
            `${this.apiURL}vehicle-bookings`,
            bookingToPost,
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

  getBookings(past: boolean): Observable<VehicleBooking[]> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        if (currentUser) {
          const employeeId = currentUser.id;

          const url = `${this.apiURL}vehicle-bookings/search/${employeeId}?past=${past}`;

          return this.http.get<VehicleBooking[]>(url, {
            headers: this.secureApiService.getHeaders(),
          });
        } else {
          return throwError('Utilisateur non authentifié');
        }
      })
    );
  }
}

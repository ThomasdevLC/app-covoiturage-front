import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { EmployeeService } from '../../employee/employee.service';
import { VehicleBooking } from '../../../models/vehicle-booking.model';
import { Observable, take, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingEmployeeService {
  private apiURL = environment.apiURL;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private employeeService: EmployeeService
  ) {}

  createBooking(booking: VehicleBooking): Observable<VehicleBooking> {
    return this.employeeService.currentUser$.pipe(
      take(1),
      switchMap((currentUser) => {
        if (currentUser) {
          const employeeId = { id: currentUser.id };

          const bookingToPost = {
            ...booking,
            employee: employeeId,
            companyVehicle: { id: booking.vehicle.id },
          };

          const token = this.authService.getToken();
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          });

          return this.http.post<VehicleBooking>(
            `${this.apiURL}vehicle-bookings`,
            bookingToPost,
            {
              headers,
            }
          );
        } else {
          return throwError('Utilisateur non authentifié');
        }
      })
    );
  }
}

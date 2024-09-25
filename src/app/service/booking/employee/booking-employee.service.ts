import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { EmployeeService } from '../../employee/employee.service';
import { VehicleBooking } from '../../../models/vehicle-booking.model';
import { Observable, take, switchMap, throwError } from 'rxjs';
import { SecureApiService } from '../../api/secure-api.service';

@Injectable({
  providedIn: 'root',
})
export class BookingEmployeeService {
  private apiURL = environment.apiURL;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private employeeService: EmployeeService,
    private secureApiService: SecureApiService
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
  //Faire avec IdEmployee
  getAllBookings(): Observable <VehicleBooking[]>{
          const token = this.authService.getToken();
          
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          });
          console.log("bookings employ service url: "+this.apiURL+"vehicle-bookings/");
          return this.http.get<VehicleBooking[]>(`${this.apiURL}vehicle-bookings`,{headers});
  }
   //
   deleteBooking(id: number):Observable <void>{
    if (confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      return this.secureApiService.getCurrentUser().pipe(
        switchMap((currentUser) => {
          if (currentUser) {
            return this.http.delete<void>(
              `${this.apiURL}vehicle-bookings/${id}`,
              {
                headers: this.secureApiService.getHeaders(),
              }
            );
          } else {
            return throwError(() => new Error('Utilisateur non authentifié'));
          }
        })
      );
    } else {
      return throwError(() => new Error('Suppression annulée'));
    }
   } 
  //
}

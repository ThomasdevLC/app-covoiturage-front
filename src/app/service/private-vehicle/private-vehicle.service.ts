import { Injectable } from '@angular/core';
import { PrivateVehicle } from '../../models/private-vehicle.model';
import { Observable, switchMap, take, throwError } from 'rxjs';
import { EmployeeService } from '../employee/employee.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';
import { SecureApiService } from '../api/secure-api.service';

@Injectable({
  providedIn: 'root',
})
export class PrivateVehicleService {
  private apiURL = environment.apiURL;

  constructor(
    private http: HttpClient,
    private employeeService: EmployeeService,
    private authService: AuthService,
    private secureApiService: SecureApiService,

  ) {}

  createVehicle(vehicle: PrivateVehicle): Observable<PrivateVehicle> {
    return this.employeeService.currentUser$.pipe(
      take(1),
      switchMap((currentUser) => {
        if (currentUser) {
          const employeeId = { id: currentUser.id };

          const vehicleToPost = {
            ...vehicle,
            employee: employeeId,
            type: 'PRIVATE',
          };

          const token = this.authService.getToken();
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          });

          return this.http.post<PrivateVehicle>(
            `${this.apiURL}private-vehicles`,
            vehicleToPost,
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

  getVehiclesByEmployeeId(userId: number): Observable<PrivateVehicle[]> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
         userId = currentUser.id;
 
    return this.http.get<PrivateVehicle[]>(
      `${this.apiURL}private-vehicles/employees/${userId}`,  
      {   headers: this.secureApiService.getHeaders(), }  
    );
  }))  
}
}
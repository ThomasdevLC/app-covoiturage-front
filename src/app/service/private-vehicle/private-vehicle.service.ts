import { Injectable } from '@angular/core';
import { PrivateVehicle } from '../../models/private-vehicle.model';
import { Observable, switchMap, take, throwError } from 'rxjs';
import { EmployeeService } from '../employee/employee.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PrivateVehicleService {
  private apiURL = 'http://localhost:8080/private-vehicles';

  constructor(
    private http: HttpClient,
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {}

  createVehicle(vehicle: PrivateVehicle): Observable<PrivateVehicle> {
    return this.employeeService.currentUser$.pipe(
      take(1),
      switchMap((currentUser) => {
        if (currentUser) {
          const employeeId = { id: currentUser.id };

          // Créer une nouvelle version de l'objet véhicule avec les champs requis
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

          return this.http.post<PrivateVehicle>(this.apiURL, vehicleToPost, {
            headers,
          });
        } else {
          return throwError('Utilisateur non authentifié');
        }
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { PrivateVehicle } from '../../models/private-vehicle.model';
import { Observable, switchMap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SecureApiService } from '../api/secure-api.service';

@Injectable({
  providedIn: 'root',
})
export class PrivateVehicleService {
  private apiURL = environment.apiURL;

  constructor(
    private http: HttpClient,
    private secureApiService: SecureApiService
  ) {}

  // Création d'un véhicule privé
  createVehicle(vehicle: PrivateVehicle): Observable<PrivateVehicle> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        if (currentUser) {
          const employeeId = { id: currentUser.id };
          const vehicleToPost = {
            ...vehicle,
            employee: employeeId,
          };
          return this.http.post<PrivateVehicle>(
            `${this.apiURL}private-vehicles`,
            vehicleToPost,
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

  // Récupération d'un véhicule par ID
  getVehicleById(vehicleId: number): Observable<PrivateVehicle> {
    return this.http.get<PrivateVehicle>(
      `${this.apiURL}private-vehicles/${vehicleId}`,
      {
        headers: this.secureApiService.getHeaders(),
      }
    );
  }

  // Récupération de tous les véhicules d'un employé
  getVehiclesByEmployeeId(userId: number): Observable<PrivateVehicle[]> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        const employeeId = currentUser ? currentUser.id : userId;
        return this.http.get<PrivateVehicle[]>(
          `${this.apiURL}private-vehicles/employees/${employeeId}`,
          {
            headers: this.secureApiService.getHeaders(),
          }
        );
      })
    );
  }

  // Suppression d'un véhicule
  deleteVehicle(vehicleId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiURL}private-vehicles/${vehicleId}`,
      {
        headers: this.secureApiService.getHeaders(),
      }
    );
  }

  // Mise à jour des informations d'un véhicule
  updateVehicle(vehicleId: number, updatedVehicle: PrivateVehicle): Observable<PrivateVehicle> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        const employeeId = currentUser.id; 
  
        const vehicleToUpdate = {
          ...updatedVehicle,
          employee: { id: employeeId },
        };
  
        return this.http.put<PrivateVehicle>(
          `${this.apiURL}private-vehicles/${vehicleId}`,
          vehicleToUpdate,
          {
            headers: this.secureApiService.getHeaders(),
          }
        );
      })
    );
  }
}


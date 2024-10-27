import { Injectable } from '@angular/core';
import { PrivateVehicle } from '../../models/private-vehicle.model';
import { Observable, switchMap, throwError } from 'rxjs';
import { HttpClient,  } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SecureApiService } from '../api/secure-api.service';

@Injectable({
  providedIn: 'root',
})
export class PrivateVehicleService {
  private apiURL = environment.apiURL;

  constructor(
    private http: HttpClient,
    private secureApiService: SecureApiService,

  ) {}

  createVehicle(vehicle: PrivateVehicle): Observable<PrivateVehicle> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) =>  {
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
              headers: this.secureApiService.getHeaders(),            }
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

getVehicleById(vehicleId: number): Observable<PrivateVehicle[]> {
  return this.http.get<PrivateVehicle[]>(
    `${this.apiURL}private-vehicles//${vehicleId}`,  
    {   headers: this.secureApiService.getHeaders(), }  
  );
  }
 
//faire delete
//faire update
}





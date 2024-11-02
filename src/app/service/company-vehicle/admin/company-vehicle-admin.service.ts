import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, switchMap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SecureApiService } from '../../api/api-security/secure-api.service';
import { CompanyVehicle } from '../../../models/company-vehicle/company-vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyVehicleAdminService {
  private apiURL = environment.apiURL;

  constructor(
    private http: HttpClient,
    private secureApiService: SecureApiService
  ) {}

  getAllVehicles(
    brand?: string,
    number?: string
  ): Observable<CompanyVehicle[]> {
    let params = new HttpParams();
    if (brand) {
      params = params.set('brand', brand);
    }
    if (number) {
      params = params.set('number', number);
    }

    return this.http.get<CompanyVehicle[]>(`${this.apiURL}company-vehicles/admin/`, {
      params,
      headers: this.secureApiService.getHeaders(),
    });
  }

  createVehicle(vehicle: CompanyVehicle): Observable<CompanyVehicle> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        if (currentUser) {
          const employeeId = { id: currentUser.id };
          const vehicleToPost = {
            ...vehicle,
            employee: employeeId,
          };

          return this.http.post<CompanyVehicle>(
            `${this.apiURL}company-vehicles/admin`,
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

  getVehicleById(id: number): Observable<CompanyVehicle> {
    return this.http.get<CompanyVehicle>(
      `${this.apiURL}company-vehicles/admin/${id}`,
      {
        headers: this.secureApiService.getHeaders(),
      }
    );
  }

  updateVehicle(
    id: number,
    vehicle: CompanyVehicle
  ): Observable<CompanyVehicle> {
    if (confirm('Êtes-vous sûr de vouloir modifier ce véhicule ?')) {
      return this.secureApiService.getCurrentUser().pipe(
        switchMap((currentUser) => {
          if (currentUser) {
            return this.http.put<CompanyVehicle>(
              `${this.apiURL}company-vehicles/admin/${id}`,
              vehicle,
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

  deleteCompanyVehicle(number: number): Observable<void> {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      return this.secureApiService.getCurrentUser().pipe(
        switchMap((currentUser) => {
          if (currentUser) {
            return this.http.delete<void>(
              `${this.apiURL}company-vehicles/admin/${number}`,
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


  changeVehicleStatus(
    vehicleId: number,
    newStatus: string
  ): Observable<CompanyVehicle> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        if (currentUser) {
          const employeeId = currentUser.id; 
          const params = new HttpParams()
            .set('newStatus', newStatus)
            .set('employeeId', employeeId.toString());
  
          return this.http.put<CompanyVehicle>(
            `${this.apiURL}company-vehicles/admin/${vehicleId}/status`,
            {}, 
            {
              params,
              headers: this.secureApiService.getHeaders(),
            }
          );
        } else {
          return throwError(() => new Error('Utilisateur non authentifié'));
        }
      })
    );
  }
}

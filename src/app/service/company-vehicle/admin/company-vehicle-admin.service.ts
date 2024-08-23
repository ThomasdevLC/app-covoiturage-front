import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { CompanyVehicle } from '../../../models/company-vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyVehicleAdminService {
  private apiUrl = 'http://localhost:8080/company-vehicles';

  constructor(private http: HttpClient) {}

  // Méthode pour rechercher par marque
  searchByBrand(brand: string): Observable<CompanyVehicle[]> {
    let params = new HttpParams().set('brand', brand);
    return this.http.get<CompanyVehicle[]>(`${this.apiUrl}/search`, { params });
  }

  // Méthode pour rechercher par modèle
  searchByModel(model: string): Observable<CompanyVehicle[]> {
    let params = new HttpParams().set('model', model);
    return this.http.get<CompanyVehicle[]>(`${this.apiUrl}/search`, { params });
  }
}

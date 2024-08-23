import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyVehicle } from '../../../models/company-vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyVehicleAdminService {
  private baseUrl = 'http://localhost:8080/company-vehicles';

  constructor(private http: HttpClient) {}

  getVehiclesByBrand(brand: string): Observable<CompanyVehicle[]> {
    return this.http.get<CompanyVehicle[]>(`${this.baseUrl}/brand/${brand}`);
  }
}

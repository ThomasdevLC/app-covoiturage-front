import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CompanyVehicle } from '../../../models/company-vehicle.model';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyVehicleEmployeeService {
  private apiURL = environment.apiURL;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getVehiclesByStatusAndBookingDates(
    startTime?: string,
    endTime?: string
  ): Observable<CompanyVehicle[]> {
    let params = new HttpParams();

    if (startTime) {
      params = params.set('startTime', startTime);
    }
    if (endTime) {
      params = params.set('endTime', endTime);
    }

    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<CompanyVehicle[]>(
      `${this.apiURL}company-vehicles/status-and-booking-dates`,
      { params, headers }
    );
  }
}

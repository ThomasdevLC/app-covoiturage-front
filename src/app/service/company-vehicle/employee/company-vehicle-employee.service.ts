import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CompanyVehicle } from '../../../models/company-vehicle.model';
@Injectable({
  providedIn: 'root',
})
export class CompanyVehicleEmployeeService {
  private apiUrl =
    'http://localhost:8080/company-vehicles/status-and-booking-dates';

  constructor(private http: HttpClient) {}

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

    return this.http.get<CompanyVehicle[]>(this.apiUrl, { params });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../auth/auth/auth.service';
import { Employee } from '../../../models/employee/employee.model';
import { VehicleBooking } from '../../../models/vehicle-booking/vehicle-booking.model';
import { ActivatedRoute } from '@angular/router';
import { CompanyVehicle } from '../../../models/company-vehicle/company-vehicle.model';
import { SecureApiService } from '../../api/api-security/secure-api.service';


@Injectable({
  providedIn: 'root',
})

export class CompanyVehicleEmployeeService {
  private apiURL = environment.apiURL;
  employee: Employee | undefined;
  futureBookings: VehicleBooking[] = [];
  pastBookings: VehicleBooking[] = [];

  constructor(private http: HttpClient, private authService: AuthService,    private secureApiService: SecureApiService,
    private route: ActivatedRoute) {}


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
    return this.http.get<CompanyVehicle[]>(
      `${this.apiURL}company-vehicles/status-and-booking-dates`,
      { params }
    );
  }


getVehicleBookings(idEmployee:number, past: boolean): Observable <VehicleBooking[]>{
  let params = new HttpParams();

  if (idEmployee) {
    params = params.set('employeeId', idEmployee);
  }
  if(past){
    params = params.set('past', past);
  }
  return this.http.get<VehicleBooking[]>(
    `${this.apiURL}company-vehicles/bookings-search`,
    { params }
  );
}


getVehicleById(id: number): Observable<CompanyVehicle> {
  return this.http.get<CompanyVehicle>(
    `${this.apiURL}company-vehicles/${id}`
    );
  }
}

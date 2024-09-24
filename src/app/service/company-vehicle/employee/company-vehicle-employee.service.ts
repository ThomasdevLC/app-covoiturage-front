import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CompanyVehicle } from '../../../models/company-vehicle.model';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../auth/auth.service';
import { Employee } from '../../../models/employee.model';
import { VehicleBooking } from '../../../models/vehicle-booking.model';
import { EmployeeService } from '../../employee/employee.service';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root',
})

export class CompanyVehicleEmployeeService {
  private apiURL = environment.apiURL;
  employee: Employee | undefined;
  futureBookings: VehicleBooking[] = [];
  pastBookings: VehicleBooking[] = [];



  constructor(private http: HttpClient, private authService: AuthService, private employeeService: EmployeeService, private route: ActivatedRoute) {}

  /*
  ngOnInit(): void {
    const employeeId = +this.route.snapshot.paramMap.get('id');
    this.getEmployeeBookings(employeeId);
  }
*/

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
 //
getVehicleBookings(idEmployee:number, past: boolean): Observable <VehicleBooking[]>{
  let params = new HttpParams();

  if (idEmployee) {
    params = params.set('employeeId', idEmployee);
  }
  if(past){
    params = params.set('past', past);//si ==true -> historique, sinon en cours
  }
  const token = this.authService.getToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
  console.log("vh books->"+this.apiURL+"company-vehicles/bookings-search");
  return this.http.get<VehicleBooking[]>(
    `${this.apiURL}company-vehicles/bookings-search`,
    { params, headers }
  );
}
 //
 getVehicleById(vehicleId: number): Observable<VehicleBooking> {
  const token = this.authService.getToken();
  let params =  new HttpParams()
  if(vehicleId){
    params = params.set('vehicleId', vehicleId);
  }
  
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
  return this.http.get<VehicleBooking>(
    `${this.apiURL}company-vehicles/bookings-search`,
    { params, headers }
  );
 //
}
}

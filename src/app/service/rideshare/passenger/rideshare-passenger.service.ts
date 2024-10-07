import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { RideShare } from '../../../models/rideshare/rideshare.model';
import { SecureApiService } from '../../api/secure-api.service';
import { EmployeeService } from '../../employee/employee.service';

@Injectable({
  providedIn: 'root'
})
export class RidesharePassengerService {
  private apiURL = environment.apiURL;

  constructor(
    private http: HttpClient,
    private secureApiService: SecureApiService,
  ) {}


  loadPassengerRideShares(past: boolean): Observable<RideShare[]> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        const userId = currentUser.id; 
        return this.http.get<RideShare[]>(`${this.apiURL}rideshares/passenger/${userId}?past=${past}`, {
          headers: this.secureApiService.getHeaders(),
        });
      })
    );
  }

  cancelAsPassenger(rideShareId: number): Observable<any> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        const userId = currentUser.id; 
        return this.http.post<any>(`${this.apiURL}rideshares/${rideShareId}/cancel-passenger/${userId}`, {}, {
          headers: this.secureApiService.getHeaders(),
        });
      })
    );
  }

}

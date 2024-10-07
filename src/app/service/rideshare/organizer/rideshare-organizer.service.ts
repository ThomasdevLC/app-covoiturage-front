import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { SecureApiService } from '../../api/secure-api.service';
import { RideShare } from '../../../models/rideshare/rideshare.model';
import { map, Observable, switchMap, take, tap, throwError } from 'rxjs';
import { EmployeeService } from '../../employee/employee.service';
import { RideShareCreate } from '../../../models/rideshare/rideshare-create.model';

@Injectable({
  providedIn: 'root'
})
export class RideshareOrganizerService {
  private apiURL = environment.apiURL;

  constructor(
    private http: HttpClient,
    private secureApiService: SecureApiService,
    private employeeService: EmployeeService
  ) {}

  private getCurrentUserId(): Observable<number> {
    return this.employeeService.currentUser$.pipe(
      take(1),
      map(currentUser => {
        if (currentUser) {
          return currentUser.id;
        } else {
          throw new Error('Utilisateur non authentifié');
        }
      })
    );
  }

  loadOrganizerRideShares(past: boolean): Observable<RideShare[]> {
    return this.getCurrentUserId().pipe(
      switchMap((userId) => {
        return this.http.get<RideShare[]>(`${this.apiURL}rideshares/organizer/${userId}?past=${past}`, {
          headers: this.secureApiService.getHeaders(),
        });
      })
    );
  }

  updateRideShare(id: number, updatedData: Partial<RideShareCreate>): Observable<RideShareCreate> {
    return this.getCurrentUserId().pipe(
      switchMap((userId) => {
        return this.http.post<RideShareCreate>(
          `${this.apiURL}rideshares/update/${id}?organizerId=${userId}`,
          updatedData,
          {
            headers: this.secureApiService.getHeaders(),
          }
        );
      })
    );
  }

  getRideShareById(id: number): Observable<RideShareCreate> {
    return this.http.get<RideShareCreate>(`${this.apiURL}rideshares/${id}`, {
      headers: this.secureApiService.getHeaders(),
    });
  }
}

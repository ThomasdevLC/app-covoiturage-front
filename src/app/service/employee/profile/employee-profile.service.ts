import { Injectable } from '@angular/core';
import { Observable, switchMap, tap, catchError, throwError } from 'rxjs';
import { EmployeeProfile } from '../../../models/employee/employee-profile.models';
import { HttpClient } from '@angular/common/http';
import { SecureApiService } from '../../api/api-security/secure-api.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeProfileService {
  private apiURL = environment.apiURL;

  constructor(private http: HttpClient,    private secureApiService: SecureApiService, 
  ) {}


 getEmployeeProfileById(): Observable<EmployeeProfile> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        if (currentUser) {
          const employeeId = currentUser.id;
          return this.http.get<EmployeeProfile>(`${this.apiURL}employees/${employeeId}`, {  headers: this.secureApiService.getHeaders(),
          }).pipe(
            tap((response) => {
              console.log("Profil de l'employé récupéré :", response);
            }),
            catchError((error) => {
              console.error("Erreur lors de la récupération du profil de l'employé", error);
              return  throwError(error); 
            })
          );
        } else {
          return throwError('Utilisateur non authentifié'); 
        }
      })
    );
  }

 
}

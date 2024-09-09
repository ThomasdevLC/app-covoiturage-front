import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { EmployeeConnected } from '../../models/employee/employee-connected.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiURL = 'http://localhost:8080/employees/user';
  private currentUserSubject = new BehaviorSubject<EmployeeConnected | null>(
    null
  );
  public currentUser$: Observable<EmployeeConnected | null> =
    this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAuthenticatedEmployee(): Observable<EmployeeConnected> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<EmployeeConnected>(this.apiURL, { headers }).pipe(
      catchError((error) => {
        console.error("Erreur lors de la récupération de l'utilisateur", error);
        return [];
      })
    );
  }

  initializeCurrentUser(): void {
    this.getAuthenticatedEmployee().subscribe(
      (user) => {
        this.currentUserSubject.next(user);
        console.log('Utilisateur ', user);
      },
      (error) => {
        console.error("Erreur lors de la récupération de l'utilisateur", error);
        this.currentUserSubject.next(null);
      }
    );
  }
}

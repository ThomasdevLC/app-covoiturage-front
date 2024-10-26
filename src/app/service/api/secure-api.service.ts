import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { EmployeeConnected } from '../../models/employee/employee-connected.model';

@Injectable({
  providedIn: 'root',
})
export class SecureApiService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getCurrentUser(): Observable<EmployeeConnected> {
    return this.authService.currentUser$.pipe(
      filter((currentUser) => !!currentUser), // N'avance que si l'utilisateur est non-null
      take(1),
      tap((currentUser) => {
        console.log('Current user:', currentUser);
      })
    );
  }
}
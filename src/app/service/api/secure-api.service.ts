import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { EmployeeService } from '../employee/employee.service';

@Injectable({
  providedIn: 'root',
})
export class SecureApiService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private employeeService: EmployeeService
  ) {}

  getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getCurrentUser(): Observable<any> {
    return this.employeeService.currentUser$.pipe(take(1));
  }
}

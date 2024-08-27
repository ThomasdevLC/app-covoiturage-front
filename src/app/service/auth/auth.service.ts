import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { EmployeeSignup } from '../../models/auth/employee-signup.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  signup(employee: EmployeeSignup): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>(`${this.apiURL}/signup`, employee, { headers })
      .pipe(catchError(this.handleError));
  }

  login(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>(`${this.apiURL}/login`, data, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Une erreur est survenue:', error);
    return throwError(() => new Error('Une erreur est survenue'));
  }
}

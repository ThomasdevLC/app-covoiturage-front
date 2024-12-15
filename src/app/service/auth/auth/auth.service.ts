import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, ObservableInput, tap, throwError } from 'rxjs';
import { EmployeeSignup } from '../../../models/auth/employee-signup.model';
import { environment } from '../../../../environments/environment';
import { EmployeeConnected } from '../../../models/employee/employee-connected.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = environment.apiURL;
  private tokenKey = 'authToken';
  private currentUserSubject = new BehaviorSubject<EmployeeConnected | null>(null);
  public currentUser$: Observable<EmployeeConnected | null> = this.currentUserSubject.asObservable();
  private handleError(err: any, caught: Observable<any>): ObservableInput<any> {
    console.error('An error occurred', err);
    return throwError(err);
  }

  constructor(private http: HttpClient) {
    this.initializeCurrentUser(); // Initialisation de l'utilisateur lors du démarrage
  }

  signup(employee: EmployeeSignup): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>(`${this.apiURL}auth/signup`, employee, { headers })
      .pipe(catchError(this.handleError));
  }

  login(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(`${this.apiURL}auth/login`, data, { headers }).pipe(
      tap((response) => {
      catchError((err, caught) => this.handleError(err, caught))
        this.initializeCurrentUser(); // Met à jour l'utilisateur connecté après connexion
      }),
      catchError(this.handleError)
    );
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null); // Déconnecte l'utilisateur
  }


  getAuthenticatedEmployee(): Observable<EmployeeConnected> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .get<EmployeeConnected>(`${this.apiURL}employees/user`, { headers })
      .pipe(
        catchError((error) => {
          console.error(
            "Erreur lors de la récupération de l'utilisateur",
            error
          );
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

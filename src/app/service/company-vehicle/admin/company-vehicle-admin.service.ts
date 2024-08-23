import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Vehicle } from '../../../models/vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyVehicleAdminService {
  private apiUrl = 'http://localhost:8080/company-vehicles';

  constructor(private http: HttpClient) {}

  getByBrand(brand: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}/brand/${brand}`).pipe(
      retry(1), // Réessaye une fois en cas d'erreur
      catchError(this.handleError) // Gère l'erreur
    );
  }

  getByNumber(number: string): Observable<Vehicle[]> {
    return this.http
      .get<Vehicle[]>(`${this.apiUrl}/number/${number}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Méthode de gestion des erreurs
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
  //
}

import { Injectable } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiResponseService {

  constructor() {}

  handleResponse<T>(response: Observable<ApiResponse<T>>): Observable<ApiResponse<T>> {
    return response.pipe(
      map(res => ({
        data: res.data,
        message: res.message,
        success: res.success
      })),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<ApiResponse<any>> {
    let errorMessage = 'Une erreur est survenue. Veuillez réessayer plus tard.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      errorMessage = `Erreur ${error.status}: ${error.message}`;
    }
    console.error('Error status:', error.status);
    console.error('Error body:', error.error);
    
    // Retourne un objet ApiResponse simulé avec success: false
    return of({
      data: null,
      message: errorMessage,
      success: false
    });
  }
}
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs'; 
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toastService: ToastService) {}

  // Méthode pour gérer les erreurs HTTP
  handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = 'Une erreur est survenue. Veuillez réessayer plus tard.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      if (error.status === 400 || error.status === 401 || error.status === 403 || error.status === 404) {
        errorMessage = error.error; // Message de validation ou logique métier renvoyé par le backend
      } else if (error.status === 500) {
        errorMessage = 'Erreur interne du serveur. Veuillez contacter l\'administrateur.';
      }
    }

    console.error('Error status:', error.status);
    console.error('Error body:', error.error);

    this.toastService.showError(error.status, errorMessage);
    return of({
      status: error.status,
      message: errorMessage
    });
  }


}
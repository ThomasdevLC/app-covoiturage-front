// error-handler.service.ts
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ToastService } from '../../../shared/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private toastService: ToastService) {}

  handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = 'Une erreur est survenue. Veuillez réessayer plus tard.';
    const isCriticalError = [403, 500].includes(error.status);

    if (error.error instanceof ErrorEvent) {
      // Erreur côté client ou réseau
      errorMessage = `Erreur : ${error.error.message}`;
    } else if (error.status === 500) {
      // Erreur interne du serveur
      errorMessage = "Erreur interne du serveur. Veuillez contacter l'administrateur.";
    } else {
      // Autres erreurs du backend
      errorMessage = error.error || errorMessage;
    }

    console.error('Error status:', error.status);
    console.error('Error body:', error.error);

    if (isCriticalError) {
      this.toastService.showError(error.status, errorMessage);
    } else {
      this.toastService.showWarn(errorMessage);
    }

    return of({
      status: error.status,
      message: errorMessage,
    });
  }
}


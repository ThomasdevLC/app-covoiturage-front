import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-error-toast',
  standalone: true,
  imports: [ToastModule, CommonModule],
  templateUrl: './error-toast.component.html',
  styleUrl: './error-toast.component.css'
})
export class ErrorToastComponent {
  constructor(private messageService: MessageService) {}

  /**
   * Affiche un message toast avec une sévérité basée sur le code d'erreur
   * @param status Code HTTP (ex: 404, 500, etc.)
   * @param message Message à afficher
   */
  showError(status: number, message: string): void {
    let severity = 'info'; // Par défaut

    if (status >= 400 && status < 500) {
      severity = 'warn'; // Jaune pour les erreurs côté client
    }
    if (status === 403 || status >= 500) {
      severity = 'error'; // Rouge pour les erreurs serveur ou accès interdit
    }
    if (status === 404) {
      severity = 'info'; // Bleu pour les erreurs "non trouvé"
    }

    // Ajouter le message au service PrimeNG Toast
    this.messageService.add({
      severity,
      summary: `Erreur ${status}`,
      detail: message,
      life: 5000 // Temps d'affichage (5 secondes)
    });
  }
}
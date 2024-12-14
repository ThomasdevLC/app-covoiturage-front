import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ErrorToastService {
  constructor(private messageService: MessageService) {}

  showError(status: number, message: string): void {
    let severity = 'info';

    if (status >= 400 && status < 500) {
      severity = 'warn';
    } else if (status === 403 || status >= 500) {
      severity = 'error';
    }

    this.messageService.add({
      severity,
      detail: message ,
      life: 4000,
    });
  }
}


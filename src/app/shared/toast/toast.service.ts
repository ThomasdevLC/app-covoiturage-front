// toast.service.ts
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  showError(status: number, message: string): void {
    this.messageService.add({
      severity: 'error',
      detail: message,
      life: 3000,
    });
  }

  showSuccess(message: string): void {
    this.messageService.add({
      severity: 'success',
      detail: message,
      life: 3000,
    });
  }

  showWarn(message: string): void {
    this.messageService.add({
      severity: 'warn',
      detail: message,
      life: 3000,
    });
  }

  showInfo(message: string): void {
    this.messageService.add({
      severity: 'info',
      detail: message,
      life: 3000,
    });
  }
}

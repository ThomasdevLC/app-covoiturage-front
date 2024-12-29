import {Component, OnInit} from '@angular/core';
import {MessageService} from "../../../service/message/message.service";
import {ErrorHandlerService} from "../../../shared/errors/error-handler.service";
import {CommonModule} from "@angular/common";
import {Message} from "../../../models/message/message.model";
import {MessageItemComponent} from "../message-item/message-item/message-item.component";
import {MessageDetailsComponent} from "../message-details/message-details/message-details.component";
import {DialogModule} from "primeng/dialog";
import {switchMap} from "rxjs";


@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule, MessageItemComponent, MessageDetailsComponent, DialogModule],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [];
  selectedMessage!: Message | null;
  displayDialog = false;

  constructor(
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService
) {}



  ngOnInit(): void {
    this.loadMessagesForCurrentEmployee();
  }

  /**
   * Charge les messages de l'utilisateur connecté.
   */
  loadMessagesForCurrentEmployee(): void {
    this.messageService.getMessagesForEmployee().subscribe({
      next: (messages) => {
        this.messages = messages;
      },
      error: (error) => {
        this.errorHandlerService.handleError(error);
      }
    });
  }


  /**
   * Supprime un message-list.
   * @param messageId L'ID du message-list à supprimer
   */
  deleteMessage(messageId: number): void {
    this.messageService.deleteMessage(messageId).subscribe({
      next: () => {
        this.loadMessagesForCurrentEmployee();
      },
      error: (error) => {
        this.errorHandlerService.handleError(error);
      }
    });
  }

  /**
   * Marque un message comme lu.
   * Récupère les détails d'un message spécifique.
   * @param messageId L'ID du message
   */
  viewMessageDetails(messageId: number): void {
    this.messageService.markMessageAsRead(messageId).pipe(
      switchMap(() => this.messageService.getMessageById(messageId))
    ).subscribe({
      next: (message) => {
        this.selectedMessage = message;
        this.displayDialog = true;
        this.loadMessagesForCurrentEmployee();
      },
      error: (error) => {
        this.errorHandlerService.handleError(error);
      }
    });
  }

  onCloseDialog(): void {
    this.displayDialog = false;
    this.selectedMessage = null;
  }
}

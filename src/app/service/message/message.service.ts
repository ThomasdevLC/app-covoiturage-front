import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {SecureApiService} from "../api/api-security/secure-api.service";
import {HttpClient} from "@angular/common/http";
import { BehaviorSubject, Observable, Subject, switchMap, tap } from 'rxjs';
import {Message} from "../../models/message/message.model";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiURL = environment.apiURL;

  public messagesChanged = new Subject<void>();

  constructor(
    private http: HttpClient,
    private secureApiService: SecureApiService
  ) {
  }

  /**
   * Récupère tous les messages non supprimés pour l'utilisateur connecté.
   * @returns Observable<Message[]>
   */
  getMessagesForEmployee(): Observable<Message[]> {
    return this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        const url = `${this.apiURL}messages/employee/${currentUser.id}`;
        return this.http.get<Message[]>(url);
      })
    );
  }

  /**
   * Marque un message comme lu.
   * @param messageId L'ID du message-list à marquer comme lu
   * @returns Observable<void>
   */
  markMessageAsRead(messageId: number): Observable<void> {
    const url = `${this.apiURL}messages/${messageId}/read`;
    return this.http.put<void>(url, {}).pipe(
      tap(() => {
        // Émet un événement pour avertir que les messages ont changé
        this.messagesChanged.next();
      })
    );
  }

  /**
   * Supprime (logiquement) un message.
   * @param messageId L'ID du message-list à supprimer
   * @returns Observable<void>
   */
  deleteMessage(messageId: number): Observable<void> {
    const url = `${this.apiURL}messages/${messageId}`;
    return this.http.delete<void>(url).pipe(
      tap(() => {
        // Idem, on notifie qu'un message a été supprimé
        this.messagesChanged.next();
      })
    );
  }


  /**
   * Récupère un message-list spécifique non supprimé par son ID.
   * @param messageId L'ID du message-list
   * @returns Observable<Message>
   */
  getMessageById(messageId: number): Observable<Message> {
    const url = `${this.apiURL}messages/${messageId}`;
    return this.http.get<Message>(url);
  }

}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Message} from "../../../../models/message/message.model";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-message-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent {
  @Input() message!: Message;
  @Output() deleteMessage = new EventEmitter<number>();

  onDelete(): void {
    this.deleteMessage.emit(this.message.id);
  }
}

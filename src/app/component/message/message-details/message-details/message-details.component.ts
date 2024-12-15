import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Message} from "../../../../models/message/message.model";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-message-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-details.component.html',
  styleUrl: './message-details.component.css'
})
export class MessageDetailsComponent {

  @Input() message!: Message;
  @Output() closeDialog = new EventEmitter<void>();

  onClose(): void {
    this.closeDialog.emit();
  }

}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Message} from "../../../../models/message/message.model";
import {CommonModule} from "@angular/common";
import { LucideAngularModule } from 'lucide-angular';
import { LucideSharedModule } from '../../../../shared/icons/lucide-shared/lucide-shared.module';

@Component({
  selector: 'app-message-item',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, LucideSharedModule],
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent {
  @Input() message!: Message;
  @Output() deleteMessage = new EventEmitter<number>();
  @Output() viewDetails   = new EventEmitter<number>();

  onDelete(): void {
    this.deleteMessage.emit(this.message.id);
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.message.id);
  }
}

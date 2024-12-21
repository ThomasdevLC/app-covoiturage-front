import {Component, EventEmitter, Input, Output} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../shared/pipe/date-formatter/date-formatter.pipe';
import { RideSharePassengerList } from '../../../../models/rideshare/passenger/ridehare-passenger-list.model';
import { BadgeModule } from 'primeng/badge';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-rideshare-passenger-search-item',
  standalone: true,
  imports: [CommonModule, RouterModule, DateFormatterPipe, BadgeModule, LucideAngularModule],
  templateUrl: './rideshare-passenger-search-item.component.html',
  styleUrl: './rideshare-passenger-search-item.component.css'
})
export class RidesharePassengerSearchItemComponent {
  @Input() rideshare!: RideSharePassengerList ;
  @Output() reserve = new EventEmitter<RideSharePassengerList>();

  onReserve(): void {
    this.reserve.emit(this.rideshare);
  }

}

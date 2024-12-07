import {Component, EventEmitter, Input, Output} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../pipe/date-formatter/date-formatter.pipe';
import { RideSharePassengerList } from '../../../../models/rideshare/passenger/ridehare-passenger-list.model';

@Component({
  selector: 'app-rideshare-passenger-search-item',
  standalone: true,
  imports: [CommonModule,RouterModule, DateFormatterPipe],
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

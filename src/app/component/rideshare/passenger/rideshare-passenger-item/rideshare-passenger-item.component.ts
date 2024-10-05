import { Component, Input } from '@angular/core';
import { RideShare } from '../../../../models/rideshare/rideshare.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rideshare-passenger-item',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './rideshare-passenger-item.component.html',
  styleUrl: './rideshare-passenger-item.component.css'
})
export class RidesharePassengerItemComponent {
  @Input() rideshare!: RideShare; 
}

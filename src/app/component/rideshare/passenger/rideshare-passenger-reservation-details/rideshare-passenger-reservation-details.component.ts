import {Component, EventEmitter, Input, Output} from '@angular/core';
import { RideShare } from '../../../../models/rideshare/rideshare.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RidesharePassengerService } from '../../../../service/rideshare/passenger/rideshare-passenger.service';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../shared/pipe/date-formatter/date-formatter.pipe';
import { RideSharePassengerDetails } from '../../../../models/rideshare/passenger/rideshare-passenger-details.model';
import { ErrorHandlerService } from '../../../../shared/errors/error-handler.service';


@Component({
  selector: 'app-rideshare-passenger-reservation-details',
  standalone: true,
  imports: [CommonModule, DateFormatterPipe],
  templateUrl: './rideshare-passenger-reservation-details.component.html',
  styleUrl: './rideshare-passenger-reservation-details.component.css'
})
export class RidesharePassengerReservationDetailsComponent {
  @Input() id!: number;
  @Input() rideshare!: RideSharePassengerDetails;
  @Output() closeDialog: EventEmitter<void> = new EventEmitter();
  past = false;

  constructor(
    private rideshareService: RidesharePassengerService,
    private route: ActivatedRoute,
    private router: Router,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.rideshareService.past$.subscribe((value) => {
      this.past = value;
    });
    this.loadRideShare(this.id); // Use the injected ID
  }

  loadRideShare(id: number): void {
    this.rideshareService.getRideShareById(id).subscribe({
      next: (rideShare: RideSharePassengerDetails) => {
        this.rideshare = rideShare;
      },
      error: (error) => {
        this.errorHandlerService.handleError(error);

      },
    });
  }

  onCancel(): void {
    if (!this.rideshare || !this.rideshare.id) return;

    this.rideshareService.cancelAsPassenger(this.rideshare.id).subscribe({
      next: () => {
        this.closeDialog.emit();
      },
      error: (error) => {
        this.errorHandlerService.handleError(error);
      },
    });
  }
}



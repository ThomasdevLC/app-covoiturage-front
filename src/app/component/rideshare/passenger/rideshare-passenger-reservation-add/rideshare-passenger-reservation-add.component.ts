import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../shared/pipe/date-formatter/date-formatter.pipe';
import { RidesharePassengerService } from '../../../../service/rideshare/passenger/rideshare-passenger.service';
import { RideSharePassengerDetails } from '../../../../models/rideshare/passenger/rideshare-passenger-details.model';
import { ErrorHandlerService } from '../../../../shared/errors/error-handler.service';
@Component({
  selector: 'app-rideshare-passenger-reservation-add',
  standalone: true,
  imports: [CommonModule, RouterModule,DateFormatterPipe,  ],
  templateUrl: './rideshare-passenger-reservation-add.component.html',
  styleUrl: './rideshare-passenger-reservation-add.component.css'
})
export class RidesharePassengerReservationAddComponent implements OnInit {
  @Input() rideShareId!: number;
  @Output() confirmReservation = new EventEmitter<void>();
  @Output() backToSearch = new EventEmitter<void>();
  rideShare$!: Observable<RideSharePassengerDetails>;

  constructor(
      private rideShareService: RidesharePassengerService,
      private errorHandlerService: ErrorHandlerService,
    ) {}

  ngOnInit(): void {
    this.loadRideShare();
  }

  loadRideShare(): void {
    this.rideShare$ = this.rideShareService.getRideShareById(this.rideShareId);
    this.rideShare$.subscribe({
      next: (rideShare) => {
      },
      error: (error) => {
        this.errorHandlerService.handleError(error);
      },
    });
  }

    joinAsPassenger(): void {
      this.rideShareService.joinAsPassenger(this.rideShareId).subscribe({
        next: () => {
          this.confirmReservation.emit();
        },
        error: (error) => {
          this.errorHandlerService.handleError(error);
        },
      });
    }

    goBack(): void {
      this.backToSearch.emit();
    }
  }

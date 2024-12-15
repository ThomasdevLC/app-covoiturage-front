import {Component, EventEmitter, Input, Output} from '@angular/core';
import { RidesharePassengerService } from '../../../../service/rideshare/passenger/rideshare-passenger.service';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../shared/pipe/date-formatter/date-formatter.pipe';
import { RideSharePassengerDetails } from '../../../../models/rideshare/passenger/rideshare-passenger-details.model';
import { ErrorHandlerService } from '../../../../shared/errors/error-handler.service';
import {ConfirmDialogComponent} from "../../../../shared/lib/confirm-dialog/confirm-dialog.component";


@Component({
  selector: 'app-rideshare-passenger-reservation-details',
  standalone: true,
  imports: [CommonModule, DateFormatterPipe, ConfirmDialogComponent],
  templateUrl: './rideshare-passenger-reservation-details.component.html',
  styleUrl: './rideshare-passenger-reservation-details.component.css'
})
export class RidesharePassengerReservationDetailsComponent {
  @Input() id!: number;
  @Input() rideshare!: RideSharePassengerDetails;
  @Output() closeDialog: EventEmitter<void> = new EventEmitter();
  past = false;

  isConfirmVisible: boolean = false;
  confirmationMessage: string = 'Êtes-vous sûr de vouloir annuler votre participation ?';
  confirmationConfirmText: string = 'Oui, annuler';
  confirmationCancelText: string = 'Non, garder ma participation';

  constructor(
    private rideshareService: RidesharePassengerService,
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
  // Méthode pour afficher le dialogue de confirmation
  showConfirmation(): void {
    this.isConfirmVisible = true;

  }

  // Méthode appelée lorsque l'utilisateur confirme l'annulation
  onConfirmCancel(): void {
    this.closeDialog.emit();
    this.onCancel();
  }
  onCancelCancel(): void {
    this.isConfirmVisible = false;
    this.closeDialog.emit();

  }

  // Méthode pour annuler la participation
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


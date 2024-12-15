import {Component, EventEmitter, Input, Output} from '@angular/core';
import { RideshareOrganizerService } from '../../../../service/rideshare/organizer/rideshare-organizer.service';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../shared/pipe/date-formatter/date-formatter.pipe';
import { RideShareOrganizerDetails } from '../../../../models/rideshare/organizer/rideshare-organizer-details.model';
import { ErrorHandlerService } from '../../../../shared/errors/error-handler.service';
import {ConfirmDialogComponent} from "../../../../shared/lib/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-rideshare-organizer-details',
  standalone: true,
  imports: [CommonModule, DateFormatterPipe, ConfirmDialogComponent],
  templateUrl: './rideshare-organizer-details.component.html',
  styleUrl: './rideshare-organizer-details.component.css'
})
export class RideshareOrganizerDetailsComponent {

  @Input() rideshare!: RideShareOrganizerDetails;
  @Output() edit = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
  past: boolean = false;

  isConfirmVisible: boolean = false;
  confirmationMessage: string = 'Êtes-vous sûr de vouloir annuler votre trajet ?' +
    'Si oui,  Les passagers seront notifiés de l\'annulation par email.';
  confirmationConfirmText: string = 'Valider';
  confirmationCancelText: string = 'Annuler';

  constructor(
    private rideshareService: RideshareOrganizerService,
    private errorHandlerService: ErrorHandlerService,
  ) {}


  onEdit() {
    this.edit.emit();
  }

  showConfirmation(): void {
    this.isConfirmVisible = true;

  }
  onConfirmCancel(): void {
    this.onCancel();
  }
  onCancelCancel(): void {
    this.isConfirmVisible = false;
  }

  onCancel() {
    if (this.rideshare.id !== undefined) {
      this.rideshareService.deleteRideShare(this.rideshare.id).subscribe({
        next: () => {
          this.cancelled.emit();
        },
        error: (error) => {
          this.errorHandlerService.handleError(error);
        },
      });
    }
  }
}

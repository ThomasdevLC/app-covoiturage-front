import {Component, EventEmitter, Input, Output} from '@angular/core';
import { RideshareOrganizerService } from '../../../../service/rideshare/organizer/rideshare-organizer.service';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../shared/pipe/date-formatter/date-formatter.pipe';
import { RideShareOrganizerDetails } from '../../../../models/rideshare/organizer/rideshare-organizer-details.model';
import { ErrorHandlerService } from '../../../../shared/errors/error-handler.service';
import {ConfirmDialogComponent} from "../../../../shared/lib/confirm-dialog/confirm-dialog.component";
import { LucideAngularModule } from 'lucide-angular';
import { ToastService } from '../../../../shared/toast/toast.service';

@Component({
  selector: 'app-rideshare-organizer-details',
  standalone: true,
  imports: [CommonModule, DateFormatterPipe, ConfirmDialogComponent, LucideAngularModule],
  templateUrl: './rideshare-organizer-details.component.html',
  styleUrl: './rideshare-organizer-details.component.css'
})
export class RideshareOrganizerDetailsComponent {

  @Input() rideshare!: RideShareOrganizerDetails;
  @Output() edit = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
  past: boolean = false;

  isConfirmVisible: boolean = false;
  confirmationMessage: string = '';
  confirmationConfirmText: string = 'Valider';
  confirmationCancelText: string = 'Retour';

  constructor(
    private rideshareService: RideshareOrganizerService,
    private errorHandlerService: ErrorHandlerService,
    private toastService: ToastService,

  ) {}


  ngOnInit(): void {
    this.rideshareService.past$.subscribe((value) => {
      this.past = value;
    });
  }


  onEdit() {
    this.edit.emit();
  }

  showConfirmation(): void {
    if (this.rideshare.passengers?.length) {
      const passengerNames = this.rideshare.passengers
        .map((passenger) => `${passenger.firstName} ${passenger.lastName}`)
        .join(', ');
      this.confirmationMessage = `Êtes-vous sûr de vouloir annuler votre trajet ? Les passagers : ${passengerNames} seront notifiés de l'annulation par email.`;
    } else {
      this.confirmationMessage = `Êtes-vous sûr de vouloir annuler votre trajet ?`;
    }

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
          this.toastService.showSuccess('Votre trajet a bien été annulé.');
        },
        error: (error) => {
          this.errorHandlerService.handleError(error);
        },
      });
    }
  }
}

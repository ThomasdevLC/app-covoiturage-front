import {Component, EventEmitter, Input, Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RideshareOrganizerService } from '../../../../service/rideshare/organizer/rideshare-organizer.service';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../shared/pipe/date-formatter/date-formatter.pipe';
import { RideShareOrganizerDetails } from '../../../../models/rideshare/organizer/rideshare-organizer-details.model';
import { ErrorHandlerService } from '../../../../shared/errors/error-handler.service';

@Component({
  selector: 'app-rideshare-organizer-details',
  standalone: true,
  imports: [CommonModule, DateFormatterPipe],
  templateUrl: './rideshare-organizer-details.component.html',
  styleUrl: './rideshare-organizer-details.component.css'
})
export class RideshareOrganizerDetailsComponent {

  @Input() rideshare!: RideShareOrganizerDetails;
  @Output() edit = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
  past: boolean = false;

  constructor(
    private rideshareService: RideshareOrganizerService,
    private errorHandlerService: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rideshareService.past$.subscribe((value) => {
      this.past = value;
    });

  }

  onEdit() {
    this.edit.emit();
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

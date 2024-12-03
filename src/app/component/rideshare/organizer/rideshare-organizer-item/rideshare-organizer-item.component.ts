import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RideShare } from '../../../../models/rideshare/rideshare.model';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../pipe/date-formatter/date-formatter.pipe';
import { Router, RouterModule } from '@angular/router';
import { RideShareOrganizerList } from '../../../../models/rideshare/organizer/rideshare-organizer-list.model';
import {RideShareOrganizerDetails} from "../../../../models/rideshare/organizer/rideshare-organizer-details.model";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {RideshareOrganizerDetailsComponent} from "../rideshare-organizer-details/rideshare-organizer-details.component";
import {RideshareOrganizerService} from "../../../../service/rideshare/organizer/rideshare-organizer.service";
import {ErrorHandlerService} from "../../../../service/shared/errors/error-handler.service";

@Component({
  selector: 'app-rideshare-organizer-item',
  standalone: true,
  imports: [CommonModule, DateFormatterPipe, RouterModule, DialogModule,
    ButtonModule, RideshareOrganizerDetailsComponent],
  templateUrl: './rideshare-organizer-item.component.html',
  styleUrl: './rideshare-organizer-item.component.css'
})
export class RideshareOrganizerItemComponent {
  @Input() rideshare!: RideShareOrganizerList;
  @Output() rideShareDeleted = new EventEmitter<number>();
  displayDialog: boolean = false;
  detailedRideshare!: RideShareOrganizerDetails;

  constructor(
    private router: Router,
    private rideshareService: RideshareOrganizerService,
  private errorHandlerService: ErrorHandlerService,

) {}

  onCheckDetails() {
    this.rideshareService.getRideShareById(this.rideshare.id).subscribe({
      next: (details) => {
        this.detailedRideshare = details;
        this.displayDialog = true;
      },
      error: (error) => {
        this.errorHandlerService.handleError(error);
      },
    });
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../../../shared/pipe/date-formatter/date-formatter.pipe';
import { Router, RouterModule } from '@angular/router';
import { RideShareOrganizerList } from '../../../../models/rideshare/organizer/rideshare-organizer-list.model';
import {RideShareOrganizerDetails} from "../../../../models/rideshare/organizer/rideshare-organizer-details.model";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {RideshareOrganizerDetailsComponent} from "../rideshare-organizer-details/rideshare-organizer-details.component";
import {RideshareOrganizerService} from "../../../../service/rideshare/organizer/rideshare-organizer.service";
import {ErrorHandlerService} from "../../../../shared/errors/error-handler.service";
import {RideshareOrganizerUpdateComponent} from "../rideshare-organizer-update/rideshare-organizer-update.component";
import { LucideAngularModule } from 'lucide-angular';
import { LucideSharedModule } from '../../../../shared/icons/lucide-shared/lucide-shared.module';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-rideshare-organizer-item',
  standalone: true,
  imports: [CommonModule, DateFormatterPipe, RouterModule, DialogModule,
    ButtonModule, RideshareOrganizerDetailsComponent, RideshareOrganizerUpdateComponent, LucideAngularModule, LucideSharedModule, BadgeModule],
  templateUrl: './rideshare-organizer-item.component.html',
  styleUrl: './rideshare-organizer-item.component.css'
})
export class RideshareOrganizerItemComponent {
  @Input() rideshare!: RideShareOrganizerList;
  @Output() rideShareDeleted = new EventEmitter<number>();
  @Output() rideShareUpdated = new EventEmitter<void>();

  displayDialog: boolean = false;
  detailedRideshare!: RideShareOrganizerDetails;
  dialogContentType: 'details' | 'update' = 'details';

  constructor(
    private router: Router,
    private rideshareService: RideshareOrganizerService,
  private errorHandlerService: ErrorHandlerService,

) {}


  onCheckDetails() {
    this.rideshareService.getRideShareById(this.rideshare.id).subscribe({
      next: (details) => {
        this.detailedRideshare = details;
        this.dialogContentType = 'details';
        this.displayDialog = true;
      },
      error: (error) => {
        this.errorHandlerService.handleError(error);
      },
    });
  }

  onEditRideShare() {
    this.dialogContentType = 'update';
  }

  onCloseUpdate() {
    this.dialogContentType = 'details';
    this.onCheckDetails();
    this.rideShareUpdated.emit();

  }

  onCloseDialog() {
    this.displayDialog = false;
  }
}

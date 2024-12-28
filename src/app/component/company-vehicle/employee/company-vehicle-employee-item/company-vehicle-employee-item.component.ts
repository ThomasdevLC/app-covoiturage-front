import { Component, Input } from '@angular/core';
import { CompanyVehicle } from '../../../../models/company-vehicle/company-vehicle.model';
import { VehicleStatusPipe } from '../../../../shared/pipe/vehicle-status/vehicle-status.pipe';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { LucideAngularModule } from 'lucide-angular';
import { LucideSharedModule } from '../../../../shared/icons/lucide-shared/lucide-shared.module';
import { MotorPipe } from '../../../../shared/pipe/motor/motor.pipe';
import { VehicleCategoryPipe } from '../../../../shared/pipe/vehicle-category/vehicle-category.pipe';

@Component({
  selector: 'app-company-vehicle-employee-item',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, CalendarModule, CarouselModule, LucideAngularModule, LucideSharedModule, MotorPipe, VehicleCategoryPipe, VehicleStatusPipe],
  templateUrl: './company-vehicle-employee-item.component.html',
  styleUrl: './company-vehicle-employee-item.component.css'
})
export class CompanyVehicleEmployeeItemComponent {

  @Input() vehicle!: CompanyVehicle;
  @Input() startTime!: string;
  @Input() endTime!: string;
  @Input() filterForm!: FormGroup;


}

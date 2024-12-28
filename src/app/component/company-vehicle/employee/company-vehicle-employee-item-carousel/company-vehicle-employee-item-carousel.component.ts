import { Component, Input } from '@angular/core';
import { CompanyVehicle } from '../../../../models/company-vehicle/company-vehicle.model';
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
  selector: 'app-company-vehicle-employee-item-carousel',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, CalendarModule, CarouselModule, LucideAngularModule, LucideSharedModule, MotorPipe, VehicleCategoryPipe],
  templateUrl: './company-vehicle-employee-item-carousel.component.html',
  styleUrl: './company-vehicle-employee-item-carousel.component.css'
})
export class CompanyVehicleEmployeeItemCarouselComponent {

  @Input() vehicle!: CompanyVehicle;
  @Input() startTime!: string;
  @Input() endTime!: string;
  @Input() filterForm!: FormGroup;

}

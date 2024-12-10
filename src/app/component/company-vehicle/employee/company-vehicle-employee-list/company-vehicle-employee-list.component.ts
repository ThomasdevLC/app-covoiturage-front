import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompanyVehicleEmployeeService } from '../../../../service/company-vehicle/employee/company-vehicle-employee.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CompanyVehicle } from '../../../../models/company-vehicle/company-vehicle.model';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-company-vehicle-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, CarouselModule],
  templateUrl: './company-vehicle-employee-list.component.html',
  styleUrls: ['./company-vehicle-employee-list.component.css'],
})
export class CompanyVehicleEmployeeListComponent {
  vehicles: CompanyVehicle[] = [];
  filterForm: FormGroup;
  currentView: string = 'carousel'; // Vue par défaut : carousel

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(
    private vehicleService: CompanyVehicleEmployeeService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      startTime: [''],
      endTime: [''],
    });
  }

  loadVehicles(): void {
    const { startTime, endTime } = this.filterForm.value;
    this.vehicleService
      .getVehiclesByStatusAndBookingDates(startTime, endTime)
      .subscribe({
        next: (data: CompanyVehicle[]) => {
          this.vehicles = data;
        },
        error: (error: any) => {
          console.error('Error fetching vehicles', error);
        },
      });
  }

  onFilter(): void {
    this.loadVehicles();
  }

  setView(view: string): void {
    this.currentView = view;
  }
}

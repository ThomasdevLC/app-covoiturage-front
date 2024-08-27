import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CompanyVehicle } from '../../../../models/company-vehicle.model';
import { CompanyVehicleEmployeeService } from '../../../../service/company-vehicle/employee/company-vehicle-employee.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-company-vehicle-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './company-vehicle-employee-list.component.html',
  styleUrls: ['./company-vehicle-employee-list.component.css'],
})
export class CompanyVehicleEmployeeListComponent implements OnInit {
  vehicles: CompanyVehicle[] = [];
  filterForm: FormGroup;

  constructor(
    private vehicleService: CompanyVehicleEmployeeService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      startTime: [''],
      endTime: [''],
    });
  }

  ngOnInit(): void {
    this.loadVehicles();
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
}

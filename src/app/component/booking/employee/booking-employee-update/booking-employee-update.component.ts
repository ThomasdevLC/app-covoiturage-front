import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { CompanyVehicleAdminService } from '../../../../service/company-vehicle/admin/company-vehicle-admin.service';
import { BookingEmployeeService } from '../../../../service/booking/employee/booking-employee.service';
import { EmployeeService } from '../../../../service/employee/employee.service';

@Component({
  selector: 'app-booking-employee-update',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './booking-employee-update.component.html',
  styleUrl: './booking-employee-update.component.css'
})
export class BookingEmployeeUpdateComponent {

  constructor(
    private route: ActivatedRoute,
    private vehicleService: CompanyVehicleAdminService,
    private bookingEmployeeService: BookingEmployeeService,
    //private numEmployee: number,
    private employeeService: EmployeeService
  ) {}
  //
ngOnInit(){
  console.log("on init booking update");
}
  //
  deleteBooking(){
    console.log("delete booking");
  }
  //
  updateBooking(){
    console.log("update booking");
  }
}

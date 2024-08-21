import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Employee } from '../../../models/employee.model';
import { EmployeeService } from '../../../service/employee/employee.service';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee | undefined;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID from URL:', id);
    if (id) {
      const employeeId = +id;
      this.employeeService.getEmployeeById(employeeId).subscribe({
        next: (data) => {
          this.employee = data;
        },
        error: (err) => {
          console.error('Error fetching employee data', err);
        },
      });
    } else {
      console.log('No ID found in URL');
    }
  }
}

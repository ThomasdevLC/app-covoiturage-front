import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { EmployeeProfile } from '../../../models/employee/employee-profile.models';
import { EmployeeService } from '../../../service/employee/employee.service';
import { EmployeeProfileService } from '../../../service/employee/profile/employee-profile.service';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent implements OnInit {
  employeeProfile$ = new BehaviorSubject<EmployeeProfile | null>(null); 
  errorMessage: string | null = null; 
  constructor(private employeeProfileService: EmployeeProfileService, private router: Router) {}

  ngOnInit(): void {
    this.loadEmployeeProfile(); 
  }

  loadEmployeeProfile(): void {
    this.employeeProfileService.getEmployeeProfileById().subscribe({
      next: (profile) => {
        this.employeeProfile$.next(profile);
        console.log('Profil de l\'employé :', profile);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du profil de l\'employé:', err);
        this.errorMessage = 'Unable to load employee profile';
      }
    });
  }
  

  onClick(): void {
    this.router.navigate(['/private-vehicles/create']);
  }
}
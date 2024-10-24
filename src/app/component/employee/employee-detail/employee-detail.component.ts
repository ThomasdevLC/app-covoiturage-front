import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';
import { EmployeeProfile } from '../../../models/employee/employee-profile.models';
import { EmployeeService } from '../../../service/employee/employee.service';
import { EmployeeProfileService } from '../../../service/employee/profile/employee-profile.service';
import { SecureApiService } from '../../../service/api/secure-api.service';
import { PrivateVehicleService } from '../../../service/private-vehicle/private-vehicle.service';
import { PrivateVehicle } from '../../../models/private-vehicle.model';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent implements OnInit {
  employeeProfile$ = new BehaviorSubject<EmployeeProfile | null>(null); 
  vehicles: PrivateVehicle[] = [];
  errorMessage: string | null = null; 

  constructor(private employeeProfileService: EmployeeProfileService,
    private secureApiService :SecureApiService,  private privateVehicleService :PrivateVehicleService , private router: Router) {}

  ngOnInit(): void {
    this.loadEmployeeProfile();
    this.loadEmployeePrivateVehciles(); 

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

  loadEmployeePrivateVehciles(): void {
    this.secureApiService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        if (currentUser) {
          return this.privateVehicleService.getVehiclesByEmployeeId(currentUser.id);  
        } else {
          throw new Error('Utilisateur non authentifié');
        }
      })
    ).subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;  
        console.log('Véhicules récupérés avec succès :', vehicles);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des véhicules :', error);
      }
    });
  }
  

  onClick(): void {
    this.router.navigate(['/private-vehicles/create']);
  }
}
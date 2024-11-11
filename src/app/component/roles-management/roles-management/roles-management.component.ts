import { Component } from '@angular/core';
import { EmployeeRole } from '../../../models/employee/employee-role.model';
import { RolesManagementService } from '../../../service/roles-management/roles-management.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RoleName } from '../../../models/enums/role-name.enum';
import { SecureApiService } from '../../../service/api/api-security/secure-api.service';

@Component({
  selector: 'app-roles-management',
  standalone: true,
  imports: [FormsModule, CommonModule, ToggleButtonModule ],
  templateUrl: './roles-management.component.html',
  styleUrl: './roles-management.component.css'
})
export class RolesManagementComponent {

  employees: EmployeeRole[] = [];
  searchKeyword: string = '';

  constructor(
    private rolesManagementService: RolesManagementService, private secureApiService: SecureApiService
  ) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

 // Récupère tous les employés
getAllEmployees(): void {
  this.rolesManagementService.getAllEmployees().subscribe({
    next: (data) => {
      this.employees = data;
      console.log('Employés récupérés', this.employees);
    },
    error: (error) => {
      console.error('Erreur lors de la récupération des employés', error);
    }
  });
}

// Recherche des employés par mot-clé
searchEmployees(): void {
  if (this.searchKeyword.trim() === '') {
    this.getAllEmployees();
  } else {
    this.rolesManagementService.searchEmployees(this.searchKeyword).subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (error) => {
        console.error('Erreur lors de la recherche des employés', error);
      }
    });
  }
}

 // Vérifier si l'utilisateur a le rôle ADMIN
 hasAdminRole(employee: EmployeeRole): boolean {
  return this.secureApiService.hasAdminRole(employee);
}

// Ajouter ou retirer le rôle ADMIN
toggleAdminRole(employeeId: number, addAdmin: boolean): void {
  this.rolesManagementService.toggleAdminRole(employeeId, addAdmin).subscribe({
    next: (updatedEmployee) => {
      // Mettre à jour les rôles de l'employé dans la liste
      const index = this.employees.findIndex((e) => e.id === employeeId);
      if (index !== -1) {
        this.employees[index] = updatedEmployee;
      }
    },
    error: (error) => {
      console.error('Erreur lors de la modification du rôle ADMIN', error);
    }
  });
}
}


import { Component } from '@angular/core';
import { EmployeeRole } from '../../../models/employee/employee-role.model';
import { SecureApiService } from '../../../service/api/api-security/secure-api.service';
import { RolesManagementService } from '../../../service/roles-management/roles-management.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RolesManagementItemComponent } from '../roles-management-item/roles-management-item.component';

@Component({
  selector: 'app-roles-management-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RolesManagementItemComponent],
  templateUrl: './roles-management-list.component.html',
  styleUrl: './roles-management-list.component.css'
})
export class RolesManagementListComponent {
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

}

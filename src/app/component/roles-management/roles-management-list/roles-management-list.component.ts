import { Component } from '@angular/core';
import { EmployeeRole } from '../../../models/employee/employee-role.model';
import { SecureApiService } from '../../../service/api/api-security/secure-api.service';
import { RolesManagementService } from '../../../service/roles-management/roles-management.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RolesManagementItemComponent } from '../roles-management-item/roles-management-item.component';
import { ErrorHandlerService } from '../../../shared/errors/error-handler.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-roles-management-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RolesManagementItemComponent, LucideAngularModule],
  templateUrl: './roles-management-list.component.html',
  styleUrl: './roles-management-list.component.css'
})
export class RolesManagementListComponent {
  employees: EmployeeRole[] = [];
  searchKeyword: string = '';

  constructor(
    private rolesManagementService: RolesManagementService,
    private errorHandlerService: ErrorHandlerService,

  ) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

 // Récupère tous les employés
getAllEmployees(): void {
  this.rolesManagementService.getAllEmployees().subscribe({
    next: (data) => {
      this.employees = data;
    },
    error: (error) => {
      this.errorHandlerService.handleError(error);
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
        this.errorHandlerService.handleError(error);
      }
    });
  }
}

}

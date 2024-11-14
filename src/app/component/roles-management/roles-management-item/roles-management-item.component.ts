import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeRole } from '../../../models/employee/employee-role.model';
import { SecureApiService } from '../../../service/api/api-security/secure-api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RolesManagementService } from '../../../service/roles-management/roles-management.service';

@Component({
  selector: 'app-roles-management-item',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './roles-management-item.component.html',
  styleUrl: './roles-management-item.component.css'
})
export class RolesManagementItemComponent {


  @Input() employee!: EmployeeRole;

  constructor(
    private secureApiService: SecureApiService,
    private rolesManagementService: RolesManagementService
  ) {}

  // Vérifier si l'utilisateur a le rôle ADMIN
  hasAdminRole(): boolean {
    return this.secureApiService.hasAdminRole(this.employee);
  }

  // Ajouter ou retirer le rôle ADMIN
  toggleAdminRole(addAdmin: boolean): void {
    this.rolesManagementService.toggleAdminRole(this.employee.id, addAdmin).subscribe({
      next: (updatedEmployee) => {
        // Mettre à jour les rôles de l'employé localement
        this.employee = updatedEmployee;
      },
      error: (error) => {
        console.error('Erreur lors de la modification du rôle ADMIN', error);
      }
    });
  }
}
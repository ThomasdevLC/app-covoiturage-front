import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeRole } from '../../../models/employee/employee-role.model';
import { SecureApiService } from '../../../service/api/api-security/secure-api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RolesManagementService } from '../../../service/roles-management/roles-management.service';
import { ErrorHandlerService } from '../../../shared/errors/error-handler.service';
import { LucideSharedModule } from '../../../shared/icons/lucide-shared/lucide-shared.module';

@Component({
  selector: 'app-roles-management-item',
  standalone: true,
  imports: [FormsModule,CommonModule, LucideSharedModule],
  templateUrl: './roles-management-item.component.html',
  styleUrl: './roles-management-item.component.css'
})
export class RolesManagementItemComponent {


  @Input() employee!: EmployeeRole;

  constructor(
    private secureApiService: SecureApiService,
    private rolesManagementService: RolesManagementService,
    private errorHandlerService: ErrorHandlerService,

  ) {}

  hasAdminRole(): boolean {
    return this.secureApiService.hasAdminRole(this.employee);
  }

  toggleAdminRole(addAdmin: boolean): void {
    setTimeout(() => {
      this.rolesManagementService.toggleAdminRole(this.employee.id, addAdmin).subscribe({
        next: (updatedEmployee) => {
          this.employee = updatedEmployee;
        },
        error: (error) => {
          this.errorHandlerService.handleError(error);
        }
      });
    }, 200);
  }
}

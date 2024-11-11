import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeConnected } from '../../../models/employee/employee-connected.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EmployeeRole } from '../../../models/employee/employee-role.model';
import { SecureApiService } from '../../../service/api/api-security/secure-api.service';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
  @Input() user: EmployeeConnected | null = null;
  @Output() logout = new EventEmitter<void>();

  constructor(
     private secureApiService: SecureApiService
  ) {}

  menuOpen: boolean = false;

  toggleDropdown(): void {
    this.menuOpen = !this.menuOpen;
  }

  hasAdminRole(employee: EmployeeRole): boolean {
    return this.secureApiService.hasAdminRole(employee);
  }

}
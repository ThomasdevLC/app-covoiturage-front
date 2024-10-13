import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeService } from '../../../service/employee/employee.service';
import { EmployeeConnected } from '../../../models/employee/employee-connected.model';
import { AuthService } from '../../../service/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive,DropdownComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent  {
  currentUser$: Observable<EmployeeConnected | null>;
  menuOpen: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router

  ) {
    this.currentUser$ = this.employeeService.currentUser$;
  }


  toggleDropdown(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.employeeService.initializeCurrentUser();
    this.router.navigate(['/']); 

  }
}
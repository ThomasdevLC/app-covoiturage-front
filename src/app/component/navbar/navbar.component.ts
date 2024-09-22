import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeService } from '../../service/employee/employee.service';
import { EmployeeConnected } from '../../models/employee/employee-connected.model';
import { AuthService } from '../../service/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  currentUser$: Observable<EmployeeConnected | null>;
  menuOpen: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {
    this.currentUser$ = this.employeeService.currentUser$;
  }

  ngOnInit(): void {
    this.employeeService.initializeCurrentUser();
  }

  toggleDropdown(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.employeeService.initializeCurrentUser();
  }
}

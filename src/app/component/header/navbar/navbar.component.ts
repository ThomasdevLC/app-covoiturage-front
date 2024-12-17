import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeConnected } from '../../../models/employee/employee-connected.model';
import { AuthService } from '../../../service/auth/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DropdownComponent } from '../dropdown/dropdown.component';
import {LucideSharedModule} from "../../../shared/icons/lucide-shared/lucide-shared.module";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive,DropdownComponent, LucideSharedModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent  {
  currentUser$: Observable<EmployeeConnected | null>;
  menuOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router

  ) {
    this.currentUser$ = this.authService.currentUser$;
  }


  toggleDropdown(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.authService.initializeCurrentUser();
    this.router.navigate(['/']);

  }
}

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
export class NavbarComponent implements OnInit {
  currentUser$: Observable<EmployeeConnected | null>;
  avatarUrl: string | null = null;
  roleIcon: string = 'User';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.currentUser$.subscribe(user => {
      if (user) {
        this.avatarUrl = user.gender === 'male'
          ? 'assets/images/avatar-m.png'
          : 'assets/images/avatar-f.png';

        this.roleIcon = this.getRoleIcon(user.roles);
      } else {
        this.avatarUrl = null;
        this.roleIcon = 'User';
      }
    });
  }

  getRoleIcon(roles: string[]): string {
    if (roles.includes('SUPER_ADMIN')) {
      return 'Crown';
    } else if (roles.includes('ADMIN')) {
      return 'Shield';
    } else {
      return 'User';
    }
  }

  logout(): void {
    this.authService.logout();
    this.authService.initializeCurrentUser();
    this.router.navigate(['/']);
  }
}

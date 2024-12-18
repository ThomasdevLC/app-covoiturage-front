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
  menuOpen: boolean = false;

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
      } else {
        this.avatarUrl = null;
      }
    });
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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmployeeConnected } from '../../../models/employee/employee-connected.model';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import { EmployeeRole } from '../../../models/employee/employee-role.model';
import { SecureApiService } from '../../../service/api/api-security/secure-api.service';
import { LucideSharedModule } from "../../../shared/icons/lucide-shared/lucide-shared.module";

// Définition de l'interface avant le décorateur @Component
interface CustomMenuItem {
  label: string;
  icon: string;
  routerLink?: string;
  isLogout?: boolean;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideSharedModule, RouterLinkActive],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  @Input() user: EmployeeConnected | null = null;
  @Output() logout = new EventEmitter<void>();

  items: CustomMenuItem[] = [];
  menuOpen: boolean = false;
  hover = false;

  constructor(private secureApiService: SecureApiService) {}

  ngOnInit() {
    this.initializeMenuItems();
  }

  initializeMenuItems() {
    this.items = [
      {
        label: 'Votre compte',
        icon: 'id-card',
        routerLink: '/employees'
      },
      ...(this.user?.roles?.includes('SUPER_ADMIN') ? [{
        label: 'Gestion utilisateurs',
        icon: 'user-round-cog',
        routerLink: '/roles-management'
      }] : []),
      ...(this.user?.roles?.includes('ADMIN') ? [{
        label: 'Gestion parc véhicules',
        icon: 'circle-parking',
        routerLink: '/company-vehicles'
      }] : []),
      {
        label: 'Trajets organisés',
        icon: 'route',
        routerLink: '/rideshares/organizer'
      },
      {
        label: 'Covoiturages',
        icon: 'users-round',
        routerLink: '/rideshares/passenger'
      },
      {
        label: 'Réservations véhicules',
        icon: 'car-front',
        routerLink: '/bookings-list'
      },
      {
        label: 'Déconnexion',
        icon: 'power-off',
        isLogout: true
      }
    ];
  }

  toggleDropdown(): void {
    this.menuOpen = !this.menuOpen;
  }

  hasAdminRole(employee: EmployeeRole): boolean {
    return this.secureApiService.hasAdminRole(employee);
  }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { EmployeeConnected } from '../../../models/employee/employee-connected.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EmployeeRole } from '../../../models/employee/employee-role.model';
import { SecureApiService } from '../../../service/api/api-security/secure-api.service';
import {LucideSharedModule} from "../../../shared/icons/lucide-shared/lucide-shared.module";
import {Menu, MenuModule} from 'primeng/menu';
import {MenuItem, PrimeTemplate} from "primeng/api";

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, RouterLink,
    LucideSharedModule, PrimeTemplate, MenuModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})

export class DropdownComponent implements OnInit {
  @Input() user: EmployeeConnected | null = null;
  @Output() logout = new EventEmitter<void>();
  items: MenuItem[] = [];

  constructor(
     private secureApiService: SecureApiService
  ) {}

  menuOpen: boolean = false;


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
      // Conditionally add "Gestion utilisateurs" if user is SUPER_ADMIN
      ...(this.user?.roles?.includes('SUPER_ADMIN') ? [{
        label: 'Gestion utilisateurs',
        icon: 'user-round-cog',
        routerLink: '/roles-management'
      }] : []),
      // Conditionally add "Gestion parc véhicules" if user is ADMIN
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
        command: () => this.logout.emit()
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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MessageService} from "../../../service/message/message.service";
import {Message} from "../../../models/message/message.model";
import { EmployeeConnected } from '../../../models/employee/employee-connected.model';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import { EmployeeRole } from '../../../models/employee/employee-role.model';
import { SecureApiService } from '../../../service/api/api-security/secure-api.service';
import { LucideSharedModule } from "../../../shared/icons/lucide-shared/lucide-shared.module";
import { BadgeModule } from 'primeng/badge';

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
  imports: [CommonModule, RouterLink, LucideSharedModule, RouterLinkActive, BadgeModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  @Input() user: EmployeeConnected | null = null;
  @Output() logout = new EventEmitter<void>();

  items: CustomMenuItem[] = [];
  menuOpen: boolean = false;
  hover = false;
  unreadMessagesCount = 0;

  constructor(private secureApiService: SecureApiService,
              private messageService: MessageService
              ) {}

  ngOnInit() {
    this.initializeMenuItems();
    this.loadUnreadMessagesCount();
    this.messageService.messagesChanged.subscribe(() => {
      this.loadUnreadMessagesCount();
    });

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


  loadUnreadMessagesCount(): void {
    this.messageService.getMessagesForEmployee().subscribe({
      next: (messages: Message[]) => {
        this.unreadMessagesCount = messages.filter(m => !m.read).length;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des messages', error);
      }
    });
  }

  hasAdminRole(employee: EmployeeRole): boolean {
    return this.secureApiService.hasAdminRole(employee);
  }
}

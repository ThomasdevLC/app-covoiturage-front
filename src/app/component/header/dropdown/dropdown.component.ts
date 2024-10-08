import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeConnected } from '../../../models/employee/employee-connected.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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

  menuOpen: boolean = false;

  toggleDropdown(): void {
    this.menuOpen = !this.menuOpen;
  }
}
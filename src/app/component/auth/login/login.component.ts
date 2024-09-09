import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { EmployeeService } from '../../../service/employee/employee.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = 'mark@test.com';
  password: string = 'Mark123';

  constructor(
    private authService: AuthService,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  login(): void {
    this.authService
      .login({ email: this.username, password: this.password })
      .subscribe((response) => {
        const token = response.token; // Assurez-vous que le token est dans la réponse
        this.authService.setToken(token);
        this.employeeService.initializeCurrentUser();
        // Charger les informations de l'utilisateur connecté
        this.router.navigate(['/']);
      });
  }
}

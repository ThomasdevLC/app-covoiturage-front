import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { EmployeeService } from '../../../service/employee/employee.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = 'mark@test.com';
  password: string = 'Mark123';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login(): void {
    this.authService
      .login({ email: this.username, password: this.password })
      .subscribe((response) => {
        const token = response.token;
        this.authService.setToken(token);
        this.authService.initializeCurrentUser();
        this.router.navigate(['/']);
      });
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['@test.com', [Validators.required, Validators.email]], 
      password: ['Test123', [Validators.required, Validators.minLength(7)]], 
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService
        .login({ email: username, password })
        .subscribe((response) => {
          const token = response.token;
          this.authService.setToken(token);
          this.authService.initializeCurrentUser();
          this.router.navigate(['/rideshares/search']);
        });
    } else {
      console.log('Formulaire invalide');
    }
  }
}
import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeSignup } from '../../../models/auth/employee-signup.model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signupForm = this.fb.group({
      gender: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const employeeSignup: EmployeeSignup = this.signupForm.value;

      this.authService.signup(employeeSignup).subscribe(
        (response) => {
          console.log('Signup successful', response);
        },
        (error) => {
          console.error('Signup error', error);
        }
      );
    }
  }
}

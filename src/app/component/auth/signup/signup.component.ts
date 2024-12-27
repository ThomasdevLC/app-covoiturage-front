import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth/auth/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeSignup } from '../../../models/auth/employee-signup.model';
import {Router, RouterLink} from '@angular/router';
import { CapitalizeDirective } from '../../../shared/directives/capitalize/capitalize.directive';
import { ErrorHandlerService } from '../../../shared/errors/error-handler.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CapitalizeDirective, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',

})
export class SignupComponent {
  isSubmitted = false;
  signupForm: FormGroup;
  constructor(private fb: FormBuilder,
  private authService: AuthService,
  private router: Router,
  private errorHandlerService: ErrorHandlerService,
) {
           {
      this.signupForm = this.fb.group({
        gender: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^0\d{9}$/), ],],
        email: ['',[Validators.required, Validators.email,   ],],
        password: ['',
          [
            Validators.required,
            Validators.minLength(8), // Minimum 8 caractères
            Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/), // Une majuscule, une minuscule, un chiffre, un caractère spécial
          ],
        ],
      });
    }
  }


  onSubmit(): void {
    this.isSubmitted = true;
    if (this.signupForm.valid) {
      const employeeSignup: EmployeeSignup = this.signupForm.value;

      this.authService.signup(employeeSignup).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error) => {
          this.errorHandlerService.handleError(error);
        }
      );
    }
  }
}

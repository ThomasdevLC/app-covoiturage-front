import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './component/header/navbar/navbar.component';
import { EmployeeService } from './service/employee/employee.service';
import { Observable } from 'rxjs';
import { EmployeeConnected } from './models/employee/employee-connected.model';
import { AuthService } from './service/auth/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app-covoiturage-front';

  currentUser$: Observable<EmployeeConnected | null>;


  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,


  ) {
    this.currentUser$ = this.authService.currentUser$;
  }


  ngOnInit(): void {
    this.authService.initializeCurrentUser();
  }
}

import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './component/header/navbar/navbar.component';
import { Observable } from 'rxjs';
import { EmployeeConnected } from './models/employee/employee-connected.model';
import { AuthService } from './service/auth/auth.service';
import { ErrorToastComponent } from './component/api/error-toast/error-toast.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ErrorToastComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app-covoiturage-front';


  currentUser$: Observable<EmployeeConnected | null>;


  constructor(
    private authService: AuthService,


  ) {
    this.currentUser$ = this.authService.currentUser$;
  }


  ngOnInit(): void {
    this.authService.initializeCurrentUser();
  }


}


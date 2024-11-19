import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable, take, tap, throwIfEmpty } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { EmployeeConnected } from '../../../models/employee/employee-connected.model';
import { EmployeeRole } from '../../../models/employee/employee-role.model';
import { RoleName } from '../../../models/enums/role-name.enum';

@Injectable({
  providedIn: 'root',
})
export class SecureApiService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getCurrentUser(): Observable<EmployeeConnected> {
    return this.authService.currentUser$.pipe(
      filter((currentUser): currentUser is EmployeeConnected => !!currentUser), // Type guard
      take(1),
      tap((currentUser) => {
        console.log('Current user:', currentUser);
      }),
      throwIfEmpty(() => new Error('Utilisateur non authentifié'))
    );
  }

  hasAdminRole(employee: EmployeeRole): boolean {
    return employee.roles.includes(RoleName.ADMIN);
  }

  hasSuperAdminRole(employee: EmployeeRole): boolean {
    return employee.roles.includes(RoleName.SUPER_ADMIN);
  }
  
}
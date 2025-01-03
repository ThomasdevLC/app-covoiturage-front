import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SecureApiService } from '../api/api-security/secure-api.service';
import { EmployeeRole } from '../../models/employee/employee-role.model';


@Injectable({
  providedIn: 'root',
})
export class RolesManagementService {
  private apiURL = environment.apiURL;

  constructor(private http: HttpClient, private secureApiService: SecureApiService) {}

  // Récupérer tous les employés
  getAllEmployees(): Observable<EmployeeRole[]> {
    return this.http.get<EmployeeRole[]>(
      `${this.apiURL}roles-management/employees`
    );
  }

  // Rechercher les employés par mot clé (nom ou email)
  searchEmployees(keyword: string): Observable<EmployeeRole[]> {
    let params = new HttpParams().set('keyword', keyword);
    return this.http.get<EmployeeRole[]>(
      `${this.apiURL}roles-management/employees/search`,
      { params }
    );
  }

  // Activer ou désactiver le rôle ADMIN d'un employé
  toggleAdminRole(employeeId: number, isAdmin: boolean): Observable<EmployeeRole> {
    return this.http.put<EmployeeRole>(
      `${this.apiURL}roles-management/employees/${employeeId}/toggle-admin-role`,
      null,
      { 
        params: new HttpParams().set('isAdmin', isAdmin.toString())
      }
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiURL = 'http://localhost:8080/employees';

  constructor(private http: HttpClient) {}

  /**
   * Get an employee by ID
   * @param id The ID of the employee
   * @returns An Observable of the employee data
   */
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiURL}/${id}`);
  }
}

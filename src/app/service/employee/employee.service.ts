import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { EmployeeConnected } from '../../models/employee/employee-connected.model';
import { environment } from '../../../environments/environment';
import { Employee } from '../../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiURL = `${environment.apiURL}`;
  private currentUserSubject = new BehaviorSubject<EmployeeConnected | null>(
    null
  );
  public currentUser$: Observable<EmployeeConnected | null> =
    this.currentUserSubject.asObservable();

  constructor(private http: HttpClient,) {}


//  récupérer les informations d'un employé 
  getEmployeeById(employeeId: number): Observable<Employee> {
  return this.http.get<Employee>(`${this.apiURL}/${employeeId}`);
}
}

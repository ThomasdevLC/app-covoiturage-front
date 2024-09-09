import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PrivateVehicle } from '../../models/private-vehicle.model';
@Injectable({
  providedIn: 'root',
})
export class PrivateVehicleService {
  private apiUrl = 'http://localhost:8080/private-vehicles';

  constructor(private http: HttpClient) {}

  createVehicle(vehicle: PrivateVehicle): Observable<PrivateVehicle> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<PrivateVehicle>(this.apiUrl, vehicle, { headers });
  }
}

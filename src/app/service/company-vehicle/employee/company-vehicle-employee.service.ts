import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CompanyVehicle } from '../../../models/company-vehicle.model';
@Injectable({
  providedIn: 'root',
})
export class CompanyVehicleEmployeeService {
  //url
  private apiURL = 'http://localhost:8080/company-vehicles';
  //url de la table des vehicule de societe
  //private table1 = 'http://localhost:8080/company-vehicles';
  //url de la table des reservations de vehicules de societe
  //private table2 = 'http://localhost:8080/vehicle_bookings';

  constructor(private http: HttpClient) {}
  //methode pour rechercher  un vehicule de compagnie par status
  //ex: status/AVAILABLE
  getCompanyVehicleByStatus(status: string): Observable<CompanyVehicle[]> {
    //console.log('??status:'+status+' url: '+this.apiURL);
    return this.http.get<CompanyVehicle[]>(`${this.apiURL}/status/${status}`);
  }
  //methode pour rechercher un vehicule de compagnie par status et date
  //ex : status/AVAILABLE/2024-08-29T18:00:00/2024-08-29T10:00:00
  getCompanyVehicleByStatusTime(
    status: string,
    dateArrivee: Date,
    dateDepart: Date
  ): Observable<CompanyVehicle[]> {
    const arriveeStr = dateArrivee.toISOString().slice(0, 19);
    const departStr = dateDepart.toISOString().slice(0, 19);
    console.log(
      '??status:' +
        status +
        ' url: ' +
        this.apiURL +
        ' date arr: ' +
        arriveeStr +
        ' date dep: ' +
        departStr
    );
    //const isPossible :boolean;//pour encadrement des dates de depart et d'arrivee
    //if()
    return this.http.get<CompanyVehicle[]>(
      `${this.apiURL}/status/${status}/arrivee/${arriveeStr}/depart/${departStr}`
    );
  }
  /*
  //methode pour initialiser une tableau de vehiclues de service disponibles
  getValuesFromCompagnyVehicle(): Observable<string[]> {
    return this.http.get<{id: number, status: string}[]>(this.table1).pipe(
      map((data) => data.map((item) => item.status))
    );
  }

  //methode pour rechercher a partir de la liste des vehicules disponibles dans la table des reservations
 getValuesFromVehicleBooking(status: string[]): Observable<any[]>{
  return this.http.post<any[]>(this.table2, {status});
  //A TESTER???
 }
 */
}

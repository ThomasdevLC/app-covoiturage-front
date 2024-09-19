import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, retry, switchMap, take, throwError } from 'rxjs';
import { CompanyVehicle } from '../../../models/company-vehicle.model';
import { EmployeeService } from '../../employee/employee.service';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyVehicleAdminService {
  
  private apiURL = environment.apiURL;

  constructor(
    private http: HttpClient,
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {}


  getAllVehicles(
    brand?: string,
    number?: string
  ): Observable<CompanyVehicle[]> {
    let params = new HttpParams();
    if (brand) {
      params = params.set('brand', brand);
    }
    if (number) {
      params = params.set('number', number);
    }
  
    // Récupérez le token d'authentification
    const token = this.authService.getToken();
  console.log('token:'+token)
    // Configurez les en-têtes de la requête
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  
    return this.http.get<CompanyVehicle[]>(`${this.apiURL}company-vehicles/`, { params, headers });
  }
  

  createVehicle(vehicle: CompanyVehicle): Observable<CompanyVehicle> {
    return this.employeeService.currentUser$.pipe(
      take(1),
      switchMap((currentUser) => {
        if (currentUser) {
          const employeeId = { id: currentUser.id };

          const vehicleToPost = {
            ...vehicle,
            employee: employeeId,
            type: 'COMPANY',
          };

          const token = this.authService.getToken();
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          });

            return this.http.post<CompanyVehicle>(`${this.apiURL}company-vehicles`, vehicleToPost, {
            headers,
          });
        } else {
          return throwError('Utilisateur non authentifié');
        }
      })
    );
  }//fin classe
  
  //const API_URL = 'https://api.example.com/company-vehicles'; // URL de votre API
  
  updateVehicle(id: number, vehicle: CompanyVehicle): Observable<CompanyVehicle> {
    console.log("update admin service"+vehicle+"\n !!"+vehicle.brand+" "+vehicle.category+" "+vehicle.status+" "+vehicle.model);
    if (confirm('Êtes-vous sûr de vouloir modifier ce véhicule ?')) {
      return this.employeeService.currentUser$.pipe(
        take(1),
        switchMap((currentUser) => {
          if (currentUser) {
            const token = this.authService.getToken();
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            });
            console.log("url: "+this.apiURL+" vh id: "+vehicle.id+"\n vh: "+vehicle.number+"\n "+vehicle.toString()+"\n head: "+headers);
              return this.http.put<CompanyVehicle>(`${this.apiURL}company-vehicles/${id}`,vehicle,  {headers });
              //return this.http.delete<void>(`${this.apiURL}company-vehicles/delete/${id}`, { headers });
          } else {
            return throwError(() => new Error('Utilisateur non authentifié'));
          }
        })
      );
    } else {
        // Retourner un observable vide si la suppression est annulée
        return throwError(() => new Error('Suppression annulée'));
      }
  }
  //methode pour supprimer un companyVehicle
  
    deleteCompanyVehicle(number: number): Observable<void>{
      // Vérifier si le véhicule existe
     console.log("sup: "+number);
      if (confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
        return this.employeeService.currentUser$.pipe(
          take(1),
          switchMap((currentUser) => {
            if (currentUser) {
              const token = this.authService.getToken();
              const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              });
    
                return this.http.delete<void>(`${this.apiURL}company-vehicles/${number}`, { headers });
            } else {
              return throwError(() => new Error('Utilisateur non authentifié'));
            }
          })
        );
      } else {
          // Retourner un observable vide si la suppression est annulée
          return throwError(() => new Error('Suppression annulée'));
        }
      }
      //
      getVehiclesByBrand(brand: string): Observable<CompanyVehicle[]>{
        let params = new HttpParams();
        if (brand) {
          params = params.set('brand', brand);
        }
        // Récupérez le token d'authentification
        const token = this.authService.getToken();
      console.log('token:'+token)
        // Configurez les en-têtes de la requête
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        });
        return this.http.get<CompanyVehicle[]>(`${this.apiURL}company-vehicles/`, { params, headers });
      }
}

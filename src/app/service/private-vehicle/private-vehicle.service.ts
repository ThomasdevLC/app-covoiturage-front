import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrivateVehicleService {

  private apiURL = 'http://localhost:8080/vehicles';

  constructor(private http: HttpClient, private employeeService: EmployeeService) {}

  createVehicle(vehicleDTO: PrivateVehicleDTO): Observable<PrivateVehicleDTO> {
    return this.employeeService.currentUser$.pipe(
      take(1), // Prendre la dernière valeur de l'utilisateur connecté
      switchMap((currentUser) => {
        if (currentUser) {
          vehicleDTO.employeeId = currentUser.id; // Ajouter l'ID de l'utilisateur connecté
          return this.http.post<PrivateVehicleDTO>(this.apiURL, vehicleDTO); // Envoyer la requête pour créer le véhicule
        } else {
          return throwError('Utilisateur non authentifié');
        }
      })
    );
  }
}}

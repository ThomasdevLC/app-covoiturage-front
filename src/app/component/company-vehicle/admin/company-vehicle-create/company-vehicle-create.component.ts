import { Component, OnInit ,NgModule} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CompanyVehicle } from '../../../../models/company-vehicle.model';
import { CommonModule } from '@angular/common';
import { VehicleCategory } from '../../../../models/enums/vehicle-category.enum';
import { VehicleMotor } from '../../../../models/enums/vehicle-motor.enum';
import { VehicleStatus } from '../../../../models/enums/vehicle-status.enum';
import { CompanyVehicleAdminService } from '../../../../service/company-vehicle/admin/company-vehicle-admin.service';


@Component({
  selector: 'app-company-vehicle-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company-vehicle-create.component.html',
  styleUrl: './company-vehicle-create.component.css'
})

export class CompanyVehicleCreateComponent {  
  
  vehicleForm!: FormGroup;
  errorMessage: string | null = null;

  categories = Object.values(VehicleCategory);
  motors  = Object.values(VehicleMotor);
  statuses = Object.values(VehicleStatus);
  //companyVehicleAdminService: CompanyVehicleAdminService | undefined;


  constructor(
    private fb: FormBuilder,
    private vehicleService: CompanyVehicleAdminService) {
      this.vehicleForm = this.fb.group({
        
        number: ['', Validators.required],
        brand: ['', Validators.required],
        model: ['', Validators.required],
        category: ['', Validators.required],
        picUrl: ['', Validators.required],
        motor: ['', Validators.required],
        seats: [null, Validators.required],
        co2PerKm: [null, Validators.required]
        
      });
    }
  
    onSubmit(): void {
      if (this.vehicleForm.valid) {
        const newVehicle: CompanyVehicle = this.vehicleForm.value;
        this.vehicleService.createVehicle(newVehicle).subscribe(
          (vehicle) => {
            console.log('Véhicule créé avec succès', vehicle);
            // this.router.navigate(['/vehicles']);
          },
          (error) => {
            console.error('Erreur lors de la création du véhicule', error);
            this.errorMessage =
              "Une erreur s'est produite lors de la création du véhicule.";
          }
        );
      } else {
        console.log("error-> champs");
        this.errorMessage = 'Veuillez remplir tous les champs correctement.';
      }
    }
  }
  

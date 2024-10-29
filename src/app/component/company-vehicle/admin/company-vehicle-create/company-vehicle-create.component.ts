import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VehicleCategory } from '../../../../models/enums/vehicle-category.enum';
import { VehicleMotor } from '../../../../models/enums/vehicle-motor.enum';
import { VehicleStatus } from '../../../../models/enums/vehicle-status.enum';
import { CompanyVehicleAdminService } from '../../../../service/company-vehicle/admin/company-vehicle-admin.service';
import { Router } from '@angular/router';
import { CompanyVehicle } from '../../../../models/company-vehicle/company-vehicle.model';

@Component({
  selector: 'app-company-vehicle-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company-vehicle-create.component.html',
  styleUrl: './company-vehicle-create.component.css',
})
export class CompanyVehicleCreateComponent {
  vehicleForm!: FormGroup;
  errorMessage: string | null = null;

  categories = Object.values(VehicleCategory);
  motors = Object.values(VehicleMotor);
  statuses = Object.values(VehicleStatus);
  urlPropose: any;
  part1: string[] | undefined;//pour l'extension du fichier
  part2: string[] | undefined;//pour le debut de l'adresse de la photo

  constructor(
    private fb: FormBuilder,
    private vehicleService: CompanyVehicleAdminService,
    private router: Router
  ) {
    this.vehicleForm = this.fb.group({
      number: ['',
         Validators.required,
         Validators.pattern(/^[A-Z]{2}-\d{3}-[A-Z]{2}$/)
      ],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      category: ['', Validators.required],
      picUrl: ['', Validators.required],
      motor: ['', Validators.required],
      seats: [null, Validators.required],
      co2PerKm: [null, Validators.required],
    });
  }
  //
 verifPicUrl(){
  //method epour verifier le format dans url picUrl
  
 let rep: Boolean = false;
  this.urlPropose = this.vehicleForm.get('picUrl')?.value;
  if(this.urlPropose.length>=4){
    this.part1 = this.urlPropose.substring((this.urlPropose.length-4),this.urlPropose.length)
    console.log('part1: '+this.part1+"\n "+this.urlPropose);
    if(this.part1?.includes('.jpg') || this.part1?.includes('jpeg') || this.part1?.includes('.png') || this.part1?.includes('.gif')){
      console.log("??true"+this.part1);
      rep = true;
    }
    
    this.part2 = this.urlPropose.substring(this.urlPropose,(this.urlPropose[0]+4))
    console.log('part2: '+this.part2+"\n "+this.urlPropose);
    if(this.part2?.includes('http')){
      console.log("??http"+this.part2);
      rep = true;
    }
    
  }
  console.log("rep "+rep);
  return rep;
}
  //
  onSubmit(): void {
   
    //const checked = this.verifPicUrl();
    if (this.vehicleForm.valid ) {//checked
      const newVehicle: CompanyVehicle = this.vehicleForm.value;
      this.vehicleService.createVehicle(newVehicle).subscribe({
        next: (vehicle) => {
          console.log('Véhicule créé avec succès', vehicle);
          this.router.navigate(['/company-vehicles']);
        },
        error: (err) => {
          console.error('Erreur lors de la création du véhicule:', err);
          this.errorMessage =
            "Une erreur s'est produite lors de la création du véhicule.";
        },
      });
    } else {
      /*
      if(!checked){
        this.errorMessage = 'Veuillez vérifier la valeur de la photo du véhicule.';
      }
      */
      console.log('error-> champs');
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
    }
  }  
}

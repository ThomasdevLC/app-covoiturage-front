import {Component, OnInit,} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './component/header/navbar/navbar.component';
import { Observable } from 'rxjs';
import { EmployeeConnected } from './models/employee/employee-connected.model';
import { AuthService } from './service/auth/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import {PrimeNGConfig} from "primeng/api";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    CommonModule,
    ToastModule,
    ToolbarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'app-covoiturage-front';

  currentUser$: Observable<EmployeeConnected | null>;

  constructor(
    private authService: AuthService,
    private primengConfig: PrimeNGConfig // Inject PrimeNGConfig
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.authService.initializeCurrentUser();
    this.configureLocale(); // Correctly call the configureLocale method here
  }

  configureLocale(): void {
    this.primengConfig.setTranslation({
      dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      monthNames: [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
      ],
      monthNamesShort: [
        'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
        'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc',
      ],
      today: "Aujourd'hui",
      clear: 'Effacer',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Sm',
      firstDayOfWeek: 1,
    });
  }
}

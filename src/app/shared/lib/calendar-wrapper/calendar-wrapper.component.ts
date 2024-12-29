import { Component, Input } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar-wrapper',
  standalone: true,
  imports: [CommonModule, CalendarModule, FormsModule, ReactiveFormsModule],
  templateUrl: './calendar-wrapper.component.html',
  styleUrl: './calendar-wrapper.component.css',
})
export class CalendarWrapperComponent {
  @Input() value!: Date | null;
  @Input() showTime = true;
  @Input() hourFormat: '12' | '24' = '24';
  @Input() placeholder = 'Sélectionnez une date';

  // Localisation pour le français
  locale: any = {
    firstDayOfWeek: 1,
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    monthNames: [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre',
    ],
    monthNamesShort: [
      'Jan',
      'Fév',
      'Mar',
      'Avr',
      'Mai',
      'Juin',
      'Juil',
      'Aoû',
      'Sep',
      'Oct',
      'Nov',
      'Déc',
    ],
    today: "Aujourd'hui",
    clear: 'Effacer',
    dateFormat: 'dd/mm/yy',
    weekHeader: 'Sem',
  };

  get minDate(): Date {
    return new Date(); // Date et heure actuelles
  }
}

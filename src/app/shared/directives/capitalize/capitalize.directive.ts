import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCapitalize]',
  standalone: true,
})
export class CapitalizeDirective {
  constructor(private control: NgControl) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    if (value && value.length > 0) {
      const capitalized = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

      // Met à jour la valeur affichée dans le champ d'entrée
      if (this.control.control) {
        this.control.control.setValue(capitalized, {
          emitModelToViewChange: true, // Synchronise l'affichage
          emitViewToModelChange: true, // Synchronise la valeur du formulaire
        });
      }
    }
  }
}

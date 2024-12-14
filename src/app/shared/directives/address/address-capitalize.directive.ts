import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appAddressCapitalize]',
  standalone: true,
})
export class AddressCapitalizeDirective {
  constructor(private control: NgControl) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    if (value && value.length > 0) {
      const capitalized = value
        .split(' ')
        .map(word => 
          word
            .split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
            .join('-')
        )
        .join(' ');

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
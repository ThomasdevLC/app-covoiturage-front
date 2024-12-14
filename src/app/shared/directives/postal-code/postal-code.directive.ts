import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPostalCode]',
  standalone: true
})
export class PostalCodeDirective {

  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    if (value) {
      // Traitement : ne garder que les chiffres et limiter à 5 caractères
      const formatted = value
        .replace(/[^0-9]/g, '') // Remplace tout ce qui n'est pas numérique par une chaîne vide
        .slice(0, 5); // Limiter la longueur à 5 caractères

      this.el.nativeElement.value = formatted;

      // Mettre à jour la valeur du contrôle
      this.control.control?.setValue(formatted, { emitEvent: false });
    }
  }
}
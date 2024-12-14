import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appLicensePlate]',
  standalone: true 
})
export class LicensePlateDirective {
  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    if (value) {
      // Traitement : convertir en majuscules et respecter le format
      const formatted = value
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '-') // Remplace tout ce qui n'est pas alphanumérique par un "-"
        .replace(/--+/g, '-') // Évite les doubles "--"
        .slice(0, 9); // Limiter la longueur à 10 caractères (DZ-123-RT)

      this.el.nativeElement.value = formatted;

      // Mettre à jour la valeur du contrôle
      this.control.control?.setValue(formatted, { emitEvent: false });
    }
  }
}

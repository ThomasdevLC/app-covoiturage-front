import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter',
  standalone: true, // Ajoutez cette ligne
})
export class DateFormatterPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) return '';
    const date = new Date(value);
    return date.toLocaleString('fr-FR', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter',
  standalone: true, 
})
export class DateFormatterPipe implements PipeTransform {
  transform(value: string | Date | undefined): string {
    if (!value) return '';

    let date: Date;

    if (typeof value === 'string') {
      date = new Date(value);
    } else if (value instanceof Date) {
      date = value;
    } else {
      return ''; 
    }

    return date.toLocaleString('fr-FR', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  }
}
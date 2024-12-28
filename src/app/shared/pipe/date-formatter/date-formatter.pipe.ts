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
    } else {
      date = value;
    }

    // Appliquer le décalage en fonction des périodes de l'année
    const offsetHours = this.getCustomOffset(date);

    // Ajouter le décalage horaire
    date.setHours(date.getHours() + offsetHours);

    return date.toLocaleString('fr-FR', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  }

  /**
   * Détermine le décalage horaire à appliquer en fonction des dates de changement d'heure
   */
  private getCustomOffset(date: Date): number {
    const year = date.getFullYear();

    // Dates du changement d'heure (exemple pour l'Europe en 2024)
    const summerTimeStart = this.getLastSundayOfMarch(year);
    const winterTimeStart = this.getLastSundayOfOctober(year);

    // Vérifier si la date est entre le début de l'heure d'été et le début de l'heure d'hiver
    if (date >= summerTimeStart && date < winterTimeStart) {
      return 2; // UTC+2 en été
    } else {
      return 1; // UTC+1 en hiver
    }
  }

  /**
   * Calcule le dernier dimanche de mars (début de l'heure d'été)
   */
  private getLastSundayOfMarch(year: number): Date {
    const march = new Date(year, 2, 31);
    const day = march.getDay(); // Jour de la semaine (0 = dimanche, 6 = samedi)
    return new Date(year, 2, 31 - day); // Reculer pour atteindre le dernier dimanche
  }

  /**
   * Calcule le dernier dimanche d'octobre (début de l'heure d'hiver)
   */
  private getLastSundayOfOctober(year: number): Date {
    const october = new Date(year, 9, 31); // 31 octobre
    const day = october.getDay(); // Jour de la semaine (0 = dimanche, 6 = samedi)
    return new Date(year, 9, 31 - day); // Reculer pour atteindre le dernier dimanche
  }
}

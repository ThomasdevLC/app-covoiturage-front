import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateMotor',
  standalone: true
})
export class MotorPipe implements PipeTransform {
  private readonly translations: Record<string, string> = {
    GASOLINE: 'Essence',
    DIESEL: 'Diesel',
    HYBRID: 'Hybride',
    ELECTRIC: 'Électrique',
  };

  transform(value: string): string {
    return this.translations[value] || value;
  }
}

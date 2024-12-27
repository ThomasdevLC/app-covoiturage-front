import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateVehicleStatus',
  standalone: true
})
export class VehicleStatusPipe implements PipeTransform {
  private readonly statusTranslations: Record<string, string> = {
    AVAILABLE: 'Disponible',
    REPAIR: 'En réparation',
    OUT_OF_SERVICE: 'Hors service',
  };

  transform(value: string): string {
    return this.statusTranslations[value] || value;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateVehicleCategory',
  standalone: true
})
export class VehicleCategoryPipe implements PipeTransform {
  private readonly translations: Record<string, string> = {
    MICRO_URBAN: 'Micro-urbaines',
    MINI_CITY: 'Mini-citadines',
    VERSATILE_CITY: 'Citadines polyvalentes',
    COMPACT: 'Compactes',
    SMALL_SEDAN: 'Berlines Taille S',
    MEDIUM_SEDAN: 'Berlines Taille M',
    LARGE_SEDAN: 'Berlines Taille L',
    SUV: 'SUV',
  };

  transform(value: string): string {
    return this.translations[value] || value;
  }
}
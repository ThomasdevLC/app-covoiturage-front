import { NgModule } from '@angular/core';
import { LucideAngularModule, MessageSquare, User, Home } from 'lucide-angular'; // Importez les icônes nécessaires

@NgModule({
  imports: [
    LucideAngularModule.pick({ MessageSquare, User, Home })
  ],
  exports: [
    LucideAngularModule
  ]
})
export class LucideSharedModule {}

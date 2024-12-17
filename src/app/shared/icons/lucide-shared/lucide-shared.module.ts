import { NgModule } from '@angular/core';
import { LucideAngularModule,
  MessageSquare, UserRound,UserRoundCog, Home, Search,CalendarSearch, UserRoundSearch,UserRoundPlus,
  Route,Car,CarFront, IdCard,UsersRound, PowerOff , Mail, ContactRound,Timer, MapPin, Smartphone, CalendarClock, MapPinPlus,
CirclePlus,Filter,PlusSquare,Clipboard, ClipboardCopy,ClipboardPaste,CircleParking } from 'lucide-angular';

@NgModule({
  imports: [
    LucideAngularModule.pick({
      MessageSquare, UserRound,UserRoundCog, Home,Search,CalendarSearch,UserRoundSearch,UserRoundPlus,
      Route,Car,CarFront, IdCard,UsersRound, PowerOff , Mail, ContactRound,Timer, MapPin, Smartphone, CalendarClock, MapPinPlus,
    CirclePlus,Filter,PlusSquare,Clipboard,ClipboardCopy,ClipboardPaste,CircleParking })
  ],
  exports: [
    LucideAngularModule
  ]
})
export class LucideSharedModule {}

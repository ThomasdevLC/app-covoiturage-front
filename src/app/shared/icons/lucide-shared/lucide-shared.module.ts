import { NgModule } from '@angular/core';
import { LucideAngularModule,
  MessageSquare, UserRound,UserRoundCog, Home, Search,CalendarSearch, UserRoundSearch,UserRoundPlus,
  Route,Car,CarFront, IdCard,UsersRound, PowerOff , Mail, ContactRound,Timer, MapPin, Smartphone, CalendarClock, MapPinPlus,
CirclePlus,ListFilter,PlusSquare,ClipboardList, Clipboard, ClipboardCopy,
  ClipboardPaste,CircleParking, AlignJustify, X, MailOpen, Pen,Trash2,
  CircleUserRound , RotateCcw, Eye, Map, GalleryHorizontalEnd,List, ArrowUpRight,EyeClosed, ShieldOff,ShieldCheck,Loader, Shield, Crown, Dot, CircleDot } from 'lucide-angular';

@NgModule({
  imports: [
    LucideAngularModule.pick({
      MessageSquare, UserRound,UserRoundCog, Home,Search,CalendarSearch,UserRoundSearch,UserRoundPlus,
      Route,Car,CarFront, IdCard,UsersRound, PowerOff , Mail, ContactRound,Timer, MapPin, Smartphone, CalendarClock, MapPinPlus,
    CirclePlus,ListFilter,PlusSquare,ClipboardList, Clipboard,ClipboardCopy,
      ClipboardPaste,CircleParking, AlignJustify, X, MailOpen, Pen,Trash2,
      CircleUserRound , RotateCcw, Eye, Map, GalleryHorizontalEnd,List, ArrowUpRight,EyeClosed, ShieldOff,ShieldCheck ,Loader, Shield, Crown, Dot, CircleDot})
  ],
  exports: [
    LucideAngularModule
  ]
})
export class LucideSharedModule {}

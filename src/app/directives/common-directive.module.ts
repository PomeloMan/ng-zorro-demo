import { NgModule } from '@angular/core';
import { FullscreenDirective } from './fullscreen.directive';
import { HoverClassDirective } from './hover-class.directive';

@NgModule({
  declarations: [
    FullscreenDirective,
    HoverClassDirective,
  ],
  exports: [
    FullscreenDirective,
    HoverClassDirective,
  ]
})
export class CommonDirectiveModule { }

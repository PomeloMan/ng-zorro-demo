import { Directive, TemplateRef, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverClass]',
})
export class HoverClassDirective {

  @Input('appHoverClass') hoverClass: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.classList.add(this.hoverClass);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.classList.remove(this.hoverClass);
  }

  constructor(
    public el: ElementRef
  ) { }
}

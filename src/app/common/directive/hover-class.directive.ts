import { Directive, TemplateRef, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
    selector: '[hoverClass]',
})
export class HoverClassDirective {

    @Input('hoverClass') hoverClass: string;

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
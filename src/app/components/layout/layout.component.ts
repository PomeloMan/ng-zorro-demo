import { Component, OnInit, Input, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {

  @Input() showFooter = true;
  @Output() resize: EventEmitter<any> = new EventEmitter();

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const appHeader = this.el.nativeElement.querySelector('app-header');
    const appFooter = this.el.nativeElement.querySelector('app-footer');
    const content = this.el.nativeElement.querySelector('nz-content');
  }
}

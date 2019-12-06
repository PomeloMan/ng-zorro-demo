import { Component, OnInit, Input, ElementRef, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {

  @Input() usePerfectScrollbar = false;
  @Input() showFooter = true;
  @Output() resize: EventEmitter<any> = new EventEmitter();

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const appHeader: HTMLElement = this.el.nativeElement.querySelector('app-header');
    const appFooter: HTMLElement = this.el.nativeElement.querySelector('app-footer');
    const content: HTMLElement = this.el.nativeElement.querySelector('nz-content');

    const layoutEl: HTMLElement = this.el.nativeElement.querySelector('.ant-layout');
    const contentHeight = layoutEl.clientHeight -
      (appHeader ? appHeader.clientHeight : 0) -
      (appFooter ? appFooter.clientHeight : 0);
    content.style.height = contentHeight + 'px';
  }
}

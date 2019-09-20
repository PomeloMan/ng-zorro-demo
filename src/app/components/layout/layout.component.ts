import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @Output() resize: EventEmitter<any> = new EventEmitter();

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
  }
}

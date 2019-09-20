import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  constructor(
    private nzModalService: NzModalService
  ) { }

  ngOnInit() {
  }

}

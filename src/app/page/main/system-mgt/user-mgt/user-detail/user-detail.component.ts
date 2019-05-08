import { Component, OnInit } from '@angular/core';
import { AbstractPageComponent } from 'src/app/common/component/abstract-page.component';
import { Router } from '@angular/router';
import { MainService } from '../../../main.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  constructor(
    protected router: Router,
    protected mainService: MainService
  ) {
    // super(router, mainService)
  }

  ngOnInit() {
    this.mainService.pageChange({
      id: 1011,
      parent: true
    });
  }
}

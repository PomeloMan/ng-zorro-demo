import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MainService } from '../../../main.service';
import { AbstractPageComponent } from 'src/app/common/component/abstract-page.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent extends AbstractPageComponent {

  constructor(
    protected router: Router,
    protected mainService: MainService
  ) {
    super()
  }

  ngOnInit() {
    this.mainService.pageChange({
      id: 1011,
      parent: true
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AbstractDetailComponent } from 'src/app/common/component/abstract-detail.component';
import { MainService } from '../../../main.service';
import { User, UserManagementService } from '../user-mgt.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent extends AbstractDetailComponent<User> implements OnInit {

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected service: UserManagementService,
    protected mainService: MainService
  ) {
    super(router, route, service, mainService)
  }

  ngOnInit() {
    this.mainService.pageChange({
      id: 1011,
      parent: true
    });
  }

}

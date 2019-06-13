import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';
import { Router } from '@angular/router';

import { AbstractMainComponent } from 'src/app/common/component/abstract-main.component';
import { User, UserManagementService } from './user-mgt.service';

class UserPageForm {
  username: string = '';
}

@Component({
  selector: 'app-user-mgt',
  templateUrl: './user-mgt.component.html',
  styleUrls: ['./user-mgt.component.scss']
})
export class UserManagementComponent extends AbstractMainComponent<User> implements OnInit {

  body: UserPageForm = new UserPageForm();
  initial = true;
  selectionId = 'username';

  constructor(
    protected router: Router,
    protected service: UserManagementService,
    protected mainService: MainService
  ) {
    super(router, service, mainService);
  }

  callback() {
    this.results.forEach((r: any) => {
      // r.id = r.username;
      r.disabled = r.status === 'Init';
    });
  }
}

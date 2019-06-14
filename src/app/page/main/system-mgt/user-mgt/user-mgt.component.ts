import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';
import { Router } from '@angular/router';

import { AbstractMainComponent } from 'src/app/common/component/abstract-main.component';
import { User, UserManagementService } from './user-mgt.service';
import { FormBuilder, Validators } from '@angular/forms';

class UserPageForm {
  username: string = '';
}

@Component({
  selector: 'app-user-mgt',
  templateUrl: './user-mgt.component.html',
  styleUrls: ['./user-mgt.component.scss']
})
export class UserManagementComponent extends AbstractMainComponent<User> implements OnInit {

  // super
  body: UserPageForm = new UserPageForm();
  initial = true;
  selectionId = 'username';

  // this

  constructor(
    protected router: Router,
    protected service: UserManagementService,
    protected mainService: MainService,
    private fb: FormBuilder
  ) {
    super(router, service, mainService);
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      role: [null, [Validators.required]]
    });
  }

  callback() {
    this.results.forEach((r: any) => {
      // r.id = r.username;
      r.disabled = r.status === 'Init';
    });
  }
}

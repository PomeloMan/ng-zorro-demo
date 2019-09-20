import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';
import { Router } from '@angular/router';

import { AbstractMainComponent } from 'src/app/common/component/abstract-main.component';
import { User, UserService } from './user.service';
import { FormBuilder, Validators } from '@angular/forms';

class UserPageForm {
  username: string = '';
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends AbstractMainComponent<User> implements OnInit {

  // super
  body: UserPageForm = new UserPageForm();
  initial = true;
  selectionId = 'username';

  // this

  constructor(
    protected router: Router,
    protected service: UserService,
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

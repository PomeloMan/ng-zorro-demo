import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainService } from '../../main.service';
import { Router } from '@angular/router';

import { AbstractPaginatorComponent } from 'src/app/common/component/abstract-paginator.component';
import { User, UserManagementService } from './user-mgt.service';

@Component({
  selector: 'user-mgt',
  templateUrl: './user-mgt.component.html',
  styleUrls: ['./user-mgt.component.scss']
})
export class UserManagementComponent extends AbstractPaginatorComponent<User> implements OnInit, OnDestroy {

  body: any = {
    username: ''
  }

  constructor(
    private router: Router,
    private mainService: MainService,
    protected service: UserManagementService
  ) {
    super(service)
  }

  reset(): void {
    this.body.username = '';
    this.page();
  }

  ngOnInit() {
    this.mainService.createNotification('success');
    this.mainService.pageChange(
      this.mainService.getMenu(this.router.url)
    );
  }

  ngOnDestroy(): void {
    this.mainService.pageChange(
      this.mainService.getMenu(null)
    );
  }
}

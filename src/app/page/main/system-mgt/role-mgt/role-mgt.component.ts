import { Component } from '@angular/core';
import { AbstractMainComponent } from 'src/app/common/component/abstract-main.component';
import { Router } from '@angular/router';
import { MainService } from '../../main.service';
import { Role, RoleManagementService } from './role-mgt.service';

@Component({
  selector: 'app-role-mgt',
  templateUrl: './role-mgt.component.html',
  styleUrls: ['./role-mgt.component.scss']
})
export class RoleManagementComponent extends AbstractMainComponent<Role> {

  constructor(
    protected router: Router,
    protected service: RoleManagementService,
    protected mainService: MainService
  ) {
    super(router, service, mainService)
  }

}

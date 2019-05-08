import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from '../../../main.service';
import { RoleManagementService, Role } from '../role-mgt.service';

import { AbstractDetailComponent } from 'src/app/common/component/abstract-detail.component';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent extends AbstractDetailComponent<Role> {

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected service: RoleManagementService,
    protected mainService: MainService
  ) {
    super(router, route, service, mainService)
  }

  ngOnInit() {
    this.mainService.pageChange({
      id: 1021,
      parent: true
    });
  }

}

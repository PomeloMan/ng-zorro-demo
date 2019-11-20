import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { AbstractPageComponent } from 'src/app/common/component/abstract-page.component';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent extends AbstractPageComponent implements OnInit {

  constructor(
    protected router: Router,
    protected mainService: MainService
  ) {
    super();
  }

  ngOnInit() {
  }
}

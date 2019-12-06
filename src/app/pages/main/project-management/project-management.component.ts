import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { AbstractPageComponent } from 'src/app/components/abstract-page.component';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent extends AbstractPageComponent implements OnInit {

  @ViewChild(PerfectScrollbarComponent) perfectScrollbar: PerfectScrollbarComponent;

  constructor(
    protected router: Router,
    protected mainService: MainService
  ) {
    super();
  }

  ngOnInit() {
  }
}

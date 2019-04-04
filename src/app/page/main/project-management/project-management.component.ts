import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {

  constructor(
    private router: Router,
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.mainService.pageChange(
      this.mainService.getMenu('/main/project-mgt.')
    );
  }

}

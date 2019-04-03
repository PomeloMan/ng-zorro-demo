import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {

  constructor(
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.mainService.pageChange({ name: 'Project Management' });
  }

}

import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  constructor(
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.mainService.pageChange(
      this.mainService.getMenu('/main/user-mgt.')
    );
  }

}

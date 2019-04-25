import { Component, OnInit, TemplateRef } from '@angular/core';
import { MainService } from './main.service';
import { Menu } from 'src/app/config/api';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/config/provider/storage.service';
import { AuthService } from 'src/app/config/provider/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isCollapsed = false;

  menus: Menu[] = [];
  triggerTemplate: TemplateRef<void> | null = null;

  constructor(
    private router: Router,
    private storage: StorageService,
    private authService: AuthService,
    private service: MainService
  ) { }

  ngOnInit() {
    this.getMenuList();
    this.initEventListeners();
  }

  getMenuList() {
    this.service.getMenus().subscribe((res: Menu[]) => {
      this.menus = res;
    })
  }

  logout() {
    this.authService.clear();
    this.router.navigate(['/login']);
  }

  private initEventListeners() {
    let _this = this;
    this.service.pageChange$.subscribe((page: any) => {
      setTimeout(() => {
        _this.menus.forEach((menu: any) => delete menu.active);
        page.active = true;
      }, 0);
    })
  }
}

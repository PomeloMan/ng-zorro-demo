import { Component, OnInit, TemplateRef } from '@angular/core';
import { MainService, Menu } from './main.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/config/provider/storage.service';
import { AuthService } from 'src/app/config/provider/auth.service';
import { forkJoin, Observable, of } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isCollapsed = false;

  menu: any;
  menus: Menu[] = [];
  triggerTemplate: TemplateRef<void> | null = null;

  constructor(
    private router: Router,
    private storage: StorageService,
    private authService: AuthService,
    private service: MainService
  ) { }

  ngOnInit() {
    this.init();
    // this.initEventListeners();
  }

  logout() {
    this.authService.clear();
    this.router.navigate(['/login']);
  }

  private init() {
    const $menusObservable: Observable<Menu[]> = this.service.getMenus();
    const $mockData: Observable<any[]> = of([1, 2, 3, 4, 5]);
    forkJoin([$menusObservable, $mockData]).subscribe(([menus, mockData]: [Menu[], any[]]) => {
      this.menus = menus;
      console.log(mockData);
    });
  }

  // private initEventListeners() {
  //   const _this = this;
  //   this.service.pageChange$.subscribe((page: any) => {
  //     setTimeout(() => {
  //       if (page) {
  //         _this.menu = _this.service.getMenu(page.id || page.url, _this.menus, page.parent);
  //         if (_this.menu) {
  //           _this.breadcrumb = _this.menu.breadcrumb;
  //           if (page.parent && _this.menu.parent) {
  //             _this.menu.parent.active = true;
  //           } else {
  //             _this.menu.active = true;
  //           }
  //         }
  //       } else {
  //         _this.menu.active = false;
  //       }
  //     }, 0);
  //   });
  // }
}

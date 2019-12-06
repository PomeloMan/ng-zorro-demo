import { Component, OnInit, TemplateRef } from '@angular/core';
import { MainService, Menu } from './main.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/configs/provider/storage.service';
import { AuthService } from 'src/app/configs/provider/auth.service';
import { forkJoin, Observable, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { NzI18nService, en_US, zh_CN } from 'ng-zorro-antd';

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
    private i18n: NzI18nService,
    private translate: TranslateService,
    private authService: AuthService,
    private service: MainService
  ) { }

  ngOnInit() {
    this.init();
    // this.initEventListeners();
  }

  /**
   * 切换语言 -- 国际化
   */
  handleLocaleChange(locale) {
    this.i18n.setLocale(locale.match(/zh/) ? zh_CN : en_US); // antd 组件国际化
    this.translate.use(locale.match(/en|zh/) ? locale : 'zh');
  }

  /**
   * 登出
   */
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

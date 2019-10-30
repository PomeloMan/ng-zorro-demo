import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, AfterViewInit {

  // app-header 头部信息
  breadcrumbs: { label: string, url: string }[] = [];

  constructor(
    private el: ElementRef,
    private router: Router,
    private translate: TranslateService
  ) {
    this.translate.get('USER_DETAIL.BREADCRUMBS').subscribe(value => {
      Object.keys(value).forEach(key => {
        this.breadcrumbs.push(JSON.parse(value[key]));
      });
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const tabsBar: HTMLElement = this.el.nativeElement.querySelector('.ant-tabs-bar');
    const tabsContent: HTMLElement = this.el.nativeElement.querySelector('.ant-tabs-content');
    tabsContent.style.overflow = 'auto';
    tabsContent.style.height = `calc(100% - ${tabsBar.offsetHeight}px - 16px)`;
    if (!tabsContent.classList.contains('scroll-bar')) {
      tabsContent.classList.add('scroll-bar');
    }
  }
}

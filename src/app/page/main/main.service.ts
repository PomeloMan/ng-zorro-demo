import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/config/provider/api.service';
import { of, Subject, Observable } from 'rxjs';
import { API } from 'src/app/config/api';
import { tap } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd';

import menus from '../../../assets/mock/main/menus.json';
import breadcrumb from '../../../assets/mock/main/breadcrumb.json';
import { useMockData } from 'src/app/config/app.constant.js';

@Injectable()
export class MainService {

    menus: Menu[];

    constructor(
        private service: ApiService,
        private notification: NzNotificationService
    ) { }

    // Observable string sources
    private page = new Subject<Object>();
    // Observable string streams
    pageChange$ = this.page.asObservable();
    // Service message commands
    pageChange(option: Object) {
        this.page.next(option);
    }

    getMenu(url) {
        let target = null;
        this.menus.forEach(menu => {
            let res = this._getMenu(url, menu);
            if (res) {
                target = res;
            }
        });
        return target;
    }

    getMenus(): Observable<Menu[]> {
        if (!this.menus) {
            if (useMockData) {
                this.menus = menus;
            } else {
                this.service.get(API.MENU_NAV_URL).pipe(tap(res => {
                    this.menus = res;
                }))
            }
            return this.getMenus();
        } else {
            return of(this.menus);
        }
    }

    createNotification(type: 'success' | 'info' | 'warning' | 'error' | 'blank' | string, title?: string, content?: string): void {
        this.notification.create(
            type,
            title ? title : type.toLocaleUpperCase(),
            content
        );
    }

    private _getMenu(url, menu) {
        if (menu.children) {
            let result = null;
            menu.children.forEach(child => {
                let res = this._getMenu(url, child);
                if (res) {
                    result = res;
                }
            });
            return result;
        } else {
            if (menu.url === url) {
                menu.breadcrumb = breadcrumb[menu.name]
                return menu;
            }
            setTimeout(() => {
                menu.active = false;
            }, 0);
        }
    }
}

export interface Menu {
    id: string;
    icon: string;
    name: string;
    pid: string;
    url?: string;
    children?: Menu[];
    breadcrumb?: any[];
}
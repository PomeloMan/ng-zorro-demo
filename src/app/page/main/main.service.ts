import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/config/provider/api.service';
import { of, Subject, Observable } from 'rxjs';
import { API } from 'src/app/config/api';
import { tap } from 'rxjs/operators';
import { NzNotificationService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { isNullOrUndefined } from 'util';

import { useMockData } from 'src/app/config/app.constant.js';
import menus from '../../../assets/mock/main/menus.json';

@Injectable()
export class MainService {

    menus: Menu[];

    constructor(
        private service: ApiService,
        private notification: NzNotificationService,
        private modal: NzModalService
    ) { }

    // Observable string sources
    private page = new Subject<object>();
    // Observable string streams
    pageChange$ = this.page.asObservable();
    // Service message commands
    pageChange(option: object) {
        this.page.next(option);
    }

    /**
	 * 根据 url 查找 menus 中 link 符合的 menu
	 * @param url 
	 * @param menus 
	 * @param parent 是否返回父级模块
	 */
    getMenu(key?, menus: any[] = [], parent: boolean = false) {
        if (key) {
            let target: any;
            // every: 碰到return false的时候，循环中止
            // some: 碰到return ture的时候，循环中止
            menus.some(menu => {
                // console.log(menu.name)
                if (key === menu.url || key === menu.id) {
                    return target = menu;
                }
                if (menu.children) {
                    target = this.getMenu(key, menu.children, parent);
                    if (isNullOrUndefined(target)) {
                        return false;
                    }
                    if (parent && isNullOrUndefined(target.parent)) {
                        target.parent = menu;
                    }
                    return target;
                }
            })
            return target;
        } else {
            return menus;
        }
    }

    getMenus(): Observable<Menu[]> {
        if (!this.menus) {
            if (useMockData) {
                return of(menus).pipe(tap(res => {
                    this.menus = res;
                }));
            } else {
                return this.service.get(API.MENU_NAV_URL).pipe(tap(res => {
                    this.menus = res;
                }))
            }
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

    showConfirm(callback = () => { }, title: string = 'Do you Want to delete these items?', content?: string): NzModalRef {
        return this.modal.confirm({
            nzTitle: title,
            nzContent: content,
            nzOnOk: () => {
                callback();
            }
        });
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

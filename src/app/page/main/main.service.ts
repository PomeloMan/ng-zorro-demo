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
    private page = new Subject<Object>();
    // Observable string streams
    pageChange$ = this.page.asObservable();
    // Service message commands
    pageChange(option: Object) {
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
			let target;
			//every: 碰到return false的时候，循环中止
			//some: 碰到return ture的时候，循环中止
			menus.some(menu => {
                // console.log(menu.name)
				if (menu.children) {
					target = this.getMenu(key, menu.children);
					if (isNullOrUndefined(target)) return false;
					if (parent)
						return { 'menu': target, 'pmenu': menu };
					else
						return target;
				} else {
					if (key == menu.url || key == menu.id) {
						return target = menu;
                    }
				}
			})
			return target;
		} else {
			// if url is empty, return all menus(include submenus)
			let _menus = [];
			menus.forEach(menu => {
				_menus.push(menu);
				if (menu.children)
					_menus = _menus.concat(this.getMenu(key, menu.children));
			})
			return _menus;
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
                callback()
            }
        });
    }

    private void
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

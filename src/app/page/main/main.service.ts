import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/config/provider/api.service';
import { of, Subject, Observable } from 'rxjs';
import { Menu } from 'src/app/config/api';
import { tap } from 'rxjs/operators';

@Injectable()
export class MainService {

    menus: Menu[];

    constructor(
        private api: ApiService
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
            return this.getMenuList();
        } else {
            return of(this.menus);
        }
    }

    getMenuList() {
        return of(menus).pipe(tap(res => {
            this.menus = res;
        }))
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
                return menu;
            }
            setTimeout(() => {
                menu.active = false;
            }, 0);
        }
    }
}

const menus: Menu[] = [
    {
        id: '100',
        pid: '0',
        url: '/main/project-mgt.',
        name: 'Project Management',
        icon: 'project'
    }, {
        id: '1000',
        pid: '0',
        name: 'System Management',
        icon: 'setting',
        children: [{
            id: '1001',
            pid: '1000',
            url: '/main/system-mgt/user-mgt',
            name: 'User Mgt',
            icon: 'user',
        }, {
            id: '1002',
            pid: '1000',
            url: '/main/system-mgt/role-mgt',
            name: 'Role Mgt',
            icon: 'safety',
        }]
    }
]
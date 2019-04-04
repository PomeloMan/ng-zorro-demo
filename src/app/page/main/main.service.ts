import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/config/provider/api.service';
import { of, Subject, Observable } from 'rxjs';
import { Menu } from 'src/app/config/api';
import { tap } from 'rxjs/operators';

@Injectable()
export class MainService {

    private menus: Menu[];

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
        return this.menus.find(menu => menu.url == url);
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
}

const menus: Menu[] = [
    {
        id: '100',
        pid: '0',
        url: '/main/project-mgt.',
        name: 'Project Management',
        icon: 'project'
    }, {
        id: '200',
        pid: '0',
        url: '/main/user-mgt.',
        name: 'User Management',
        icon: 'user'
    }
]
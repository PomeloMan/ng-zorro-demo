import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/config/provider/api.service';
import { of, Subject } from 'rxjs';
import { Menu } from 'src/app/config/api';

@Injectable()
export class MainService {

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

    getMenuList() {
        return of(menus)
    }
}

const menus: Menu[] = [
    {
        id: '100',
        pid: '0',
        url: '/main/project-mgt.',
        name: 'Project Management',
        icon: 'project'
    },
    {
        id: '200',
        pid: '0',
        url: '/main/user-mgt.',
        name: 'User Management',
        icon: 'user'
    }
]
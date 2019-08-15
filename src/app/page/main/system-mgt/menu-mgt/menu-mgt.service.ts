import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from 'src/app/config/provider/api.service';
import { CommonService, Page } from 'src/app/common/interface/service.interface';

import { useMockData } from 'src/app/config/app.constant';
import page from 'src/assets/mock/system/menu/page.json';
import list from 'src/assets/mock/system/menu/list.json';
import info from 'src/assets/mock/system/menu/info.json';

import { debounceTime } from 'rxjs/operators';

@Injectable()
export class MenuManagementService implements CommonService<Menu> {

    constructor(
        private service: ApiService
    ) { }

    info(id): Observable<Menu> {
        return of(info);
    }

    page(body?): Observable<Page<Menu[]>> {
        console.log(body);
        if (useMockData) {
            return of(page);
        } else {
            return this.service.post('', body);
        }
    }

    list(): Observable<Menu[]> {
        if (useMockData) {
            return of(list);
        } else {
            return null;
        }
    }

    save() {
        return of(null).pipe(
            debounceTime(1000)
        );
    }

    update() {
        return of(null);
    }

    delete(ids): Observable<any> {
        return of(null);
    }

}

/**
 * 菜单类
 */
export class Menu {
    id?: string;
    name?: string;
    parent?: any;
    type?: string;
    order?: number;
    url?: string;
    auth?: string;
    expand?: boolean;
    children?: Menu[];
}

/**
 * 菜单查询条件类
 */
export class MenuPageForm {
    name = '';
}

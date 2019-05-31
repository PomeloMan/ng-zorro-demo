import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Page } from 'src/app/config/api';
import { ApiService } from 'src/app/config/provider/api.service';
import { CommonService } from 'src/app/common/interface/service.interface';

import { useMockData } from 'src/app/config/app.constant';
import page from 'src/assets/mock/system/menu/page.json';
import list from 'src/assets/mock/system/menu/list.json';

@Injectable()
export class MenuManagementService implements CommonService<Menu> {

    constructor(
        private service: ApiService
    ) { }

    info(id): Observable<Menu> {
        return of(null);
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
        return of(null);
    }

    update() {
        return of(null);
    }

    delete(ids): Observable<any> {
        return of(null);
    }

    url(url) {
        return of(null);
    }
}

export interface Menu {
    id?: string;
    name?: string;
    parent?: string;
    type?: string;
    order?: number;
    url?: string;
    auth?: string;
    expand?: boolean;
    children?: Menu[];
}

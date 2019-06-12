import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Page } from 'src/app/config/api';
import { ApiService } from 'src/app/config/provider/api.service';
import { CommonService } from 'src/app/common/interface/service.interface';

import { useMockData } from 'src/app/config/app.constant';
import page from 'src/assets/mock/system/role/page.json';

@Injectable()
export class RoleManagementService implements CommonService<Role> {

    constructor(
        private service: ApiService
    ) { }

    info(id): Observable<Role> {
        return of(null);
    }

    page(body?): Observable<Page<Role[]>> {
        console.log(body);
        if (useMockData) {
            return of(page);
        } else {
            return this.service.post('', body);
        }
    }

    list(): Observable<Role[]> {
        if (useMockData) {
            return of(page);
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

    url(url): Observable<any> {
        return of(null);
    }
}

export class Role {
    id?: string;
    name?: string;
    menus?: string[];
}

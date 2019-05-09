import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Page } from 'src/app/config/api';
import { ApiService } from 'src/app/config/provider/api.service';
import { CommonService } from 'src/app/common/interface/service.interface';

import { useMockData } from 'src/app/config/app.constant';
import page from 'src/assets/mock/system/user/page.json';

@Injectable()
export class UserManagementService implements CommonService<User> {

    constructor(
        private service: ApiService
    ) { }

    info(id): Observable<User> {
        return of(null);
    }

    page(body?): Observable<Page<User[]>> {
        console.log(body);
        if (useMockData) {
            return of(page);
        } else {
            return this.service.post('', body);
        }
    }

    list(): Observable<User[]> {
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

    url(url) {
        return of(null);
    }
}

export interface User {
    key?: string;
    name?: string;
    age?: number;
    address?: string;
}
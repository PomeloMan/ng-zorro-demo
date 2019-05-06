import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/common/interface/service.interface';
import { ApiService } from 'src/app/config/provider/api.service';
import { Observable, of } from 'rxjs';
import { useMockData } from 'src/app/config/app.constant';

import page from 'src/assets/mock/system/user/page.json';
import { Page } from 'src/app/config/api';

@Injectable()
export class UserManagementService implements CommonService<User> {

    constructor(
        private service: ApiService
    ) { }

    info(): Observable<User> {
        return null;
    }
    page(params): Observable<Page<User[]>> {
        if (useMockData) {
            return of(page);
        } else {
            return this.service.post('', params);
        }
    }
    list(): Observable<User[]> {
        if (useMockData) {
            return of(page);
        } else {
            return null;
        }
    }
    update() {
        return null;
    }
    delete() {
        return null;
    }
}

export interface User {
    key?: string;
    name?: string;
    age?: number;
    address?: string;
}
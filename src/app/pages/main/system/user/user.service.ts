import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { API } from 'src/app/constants/api';
import { ApiService } from 'src/app/config/provider/api.service';
import { CommonService, Page } from 'src/app/common/interface/service.interface';

import page from 'src/assets/mock/system/user/page.json';
import { environment } from 'src/environments/environment';
import { Role } from '../role/role.service';

@Injectable()
export class UserService implements CommonService<User> {

  constructor(
    private service: ApiService
  ) { }

  page(body?): Observable<Page<User[]>> {
    return this.service.post(API.USER_PAGE_URL, body);
  }

  list(body?): Observable<User[]> {
    return this.service.post(API.USER_LIST_URL, body);
  }

  info(id): Observable<User> {
    return this.service.get(API.USER_URL + '');
  }

  save(body: User) {
    return this.service.post(API.USER_URL, body);
  }

  update(body: User) {
    return this.service.put(API.USER_URL, body);
  }

  delete(ids): Observable<any> {
    return of(null);
  }

  url(url) {
    return of(null);
  }
}

export class User {
  username: string;
  displayName?: string;
  email?: string;
  roles?: Role[];
  createdDate?: number;

  constructor(username) {
    this.username = username;
  }
}

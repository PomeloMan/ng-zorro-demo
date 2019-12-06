import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { API } from 'src/app/constants/api';
import { ApiService } from 'src/app/configs/provider/api.service';
import { CommonService, Page } from 'src/app/configs/interface/service.interface';

import { Role } from '../role/role.service';
import { debounceTime } from 'rxjs/operators';

@Injectable()
export class UserService implements CommonService<User> {

  constructor(
    private service: ApiService
  ) { }

  info(id): Observable<User> {
    return this.service.get(`${API.USER_URL}/${id}`);
  }

  page(body?): Observable<Page<User[]>> {
    return this.service.post(API.USER_PAGE_URL, body);
  }

  list(body?): Observable<User[]> {
    return this.service.post(API.USER_LIST_URL, body);
  }

  save(body: User) {
    return this.service.post(API.USER_URL, body).pipe(
      debounceTime(1000)
    );
  }

  update(body: User) {
    return this.service.put(API.USER_URL, body).pipe(
      debounceTime(1000)
    );
  }

  delete(ids): Observable<any> {
    return this.service.put(API.USER_URL, { params: { ids } }).pipe(
      debounceTime(1000)
    );
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

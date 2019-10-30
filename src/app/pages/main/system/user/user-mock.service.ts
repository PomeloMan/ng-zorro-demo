import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CommonService, Page } from 'src/app/common/interface/service.interface';
import { User } from './user.service';

import page from 'src/assets/mock/system/user/page.json';
import list from 'src/assets/mock/system/user/list.json';

@Injectable()
export class UserMockService implements CommonService<User> {

  constructor() { }

  info(id): Observable<User> {
    return of(null);
  }

  page(body?): Observable<Page<User[]>> {
    return of(page);
  }

  list(): Observable<User[]> {
    return of(list);
  }

  save(body: User): Observable<any> {
    return of(null);
  }

  update(): Observable<any> {
    return of(null);
  }

  delete(ids): Observable<any> {
    return of(null);
  }

  url(url): Observable<any> {
    return of(null);
  }
}

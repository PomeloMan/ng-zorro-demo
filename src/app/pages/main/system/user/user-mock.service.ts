import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CommonService, Page } from 'src/app/configs/interface/service.interface';
import { User } from './user.service';

import page from 'src/assets/mock/system/user/page.json';

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
    return of(null);
  }

  save(body: User): Observable<User> {
    return of(null);
  }

  update(): Observable<User> {
    return of(null);
  }

  delete(ids): Observable<any> {
    return of(null);
  }
}

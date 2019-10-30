import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CommonService, Page } from 'src/app/common/interface/service.interface';

import { Role } from './role.service';

import list from 'src/assets/mock/system/role/list.json';

@Injectable()
export class RoleMockService implements CommonService<Role> {

  constructor() { }

  info(id): Observable<Role> {
    return of(null);
  }

  page(body?): Observable<Page<Role[]>> {
    return of(null);
  }

  list(): Observable<Role[]> {
    return of(list);
  }

  save(body: Role): Observable<any> {
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

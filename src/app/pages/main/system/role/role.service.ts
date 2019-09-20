import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from 'src/app/config/provider/api.service';
import { CommonService, Page } from 'src/app/common/interface/service.interface';

import { environment } from 'src/environments/environment';

import page1 from 'src/assets/mock/system/role/page_1.json';
import page2 from 'src/assets/mock/system/role/page_2.json';

@Injectable()
export class RoleService implements CommonService<Role> {

  constructor(
    private service: ApiService
  ) { }

  info(id): Observable<Role> {
    return of(null);
  }

  page(body?): Observable<Page<Role[]>> {
    if (environment.useMockData) {
      if (body && body.pageIndex === 1) {
        return of(page1);
      } else if (body && body.pageIndex === 2) {
        return of(page2);
      } else {
        return of(page1);
      }
    } else {
      return this.service.post('', body);
    }
  }

  list(): Observable<Role[]> {
    if (environment.useMockData) {
      return of(page1);
    } else {
      return null;
    }
  }

  save(role: Role) {
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

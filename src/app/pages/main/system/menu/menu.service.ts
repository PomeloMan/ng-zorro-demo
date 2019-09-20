import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from 'src/app/config/provider/api.service';
import { CommonService, Page } from 'src/app/common/interface/service.interface';

import page from 'src/assets/mock/system/menu/page.json';
import list from 'src/assets/mock/system/menu/list.json';
import info from 'src/assets/mock/system/menu/info.json';

import { debounceTime } from 'rxjs/operators';

@Injectable()
export class MenuService implements CommonService<Menu> {

  constructor(
    private service: ApiService
  ) { }

  info(id): Observable<Menu> {
    return of(info);
  }

  page(body?: MenuSearchForm): Observable<Page<Menu[]>> {
    return of(page);
  }

  list(body?: MenuSearchForm): Observable<Menu[]> {
    return of(list);
  }

  save(body: Menu): Observable<Menu> {
    return of(null).pipe(
      debounceTime(1000)
    );
  }

  update(body: Menu): Observable<Menu> {
    return of(null).pipe(
      debounceTime(1000)
    );
  }

  delete(ids): Observable<any> {
    return of(null).pipe(
      debounceTime(1000)
    );
  }
}

/**
 * 菜单类
 */
export class Menu {
  id?: string;
  name?: string;
  icon?: string;
  parent?: any;
  parentId?: string;
  type?: string;
  order?: number;
  url?: string;
  auth?: string;
  expand?: boolean;
  children?: Menu[];
}

/**
 * 菜单查询条件类
 */
export class MenuSearchForm {
  name = '';
  type = '';
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ApiService } from 'src/app/configs/provider/api.service';
import { CommonService, Page } from 'src/app/configs/interface/service.interface';
import { API } from 'src/app/constants/api';

@Injectable()
export class MenuService implements CommonService<Menu> {

  constructor(
    private service: ApiService
  ) { }

  info(id): Observable<Menu> {
    return this.service.get(`${API.MENU_URL}/${id}`);
  }

  page(body?: MenuSearchForm): Observable<Page<Menu[]>> {
    return this.service.post(API.MENU_PAGE_URL, body);
  }

  list(body?: MenuSearchForm): Observable<Menu[]> {
    return this.service.post(API.MENU_LIST_URL, body);
  }

  save(body: Menu): Observable<Menu> {
    return this.service.post(API.MENU_URL, body).pipe(
      debounceTime(1000)
    );
  }

  update(body: Menu): Observable<Menu> {
    return this.service.put(API.MENU_URL, body).pipe(
      debounceTime(1000)
    );
  }

  delete(ids): Observable<any> {
    return this.service.delete(API.MENU_URL, { params: { ids } }).pipe(
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

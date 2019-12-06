import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CommonService, Page } from 'src/app/configs/interface/service.interface';
import { Menu, MenuSearchForm } from './menu.service';

import page from 'src/assets/mock/system/menu/page.json';
import list from 'src/assets/mock/system/menu/list.json';
import info from 'src/assets/mock/system/menu/info.json';

@Injectable()
export class MenuMockService implements CommonService<Menu> {

  constructor() { }

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

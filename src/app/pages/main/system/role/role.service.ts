import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from 'src/app/configs/provider/api.service';
import { CommonService, Page } from 'src/app/configs/interface/service.interface';
import { API } from 'src/app/constants/api';
import { debounceTime } from 'rxjs/operators';

@Injectable()
export class RoleService implements CommonService<Role> {

  constructor(
    private service: ApiService
  ) { }

  info(id): Observable<Role> {
    return this.service.get(`${API.ROLE_URL}/${id}`);
  }

  page(body?): Observable<Page<Role[]>> {
    return this.service.post(API.ROLE_PAGE_URL, body);
  }

  list(body?): Observable<Role[]> {
    return this.service.post(API.ROLE_LIST_URL, body);
  }

  save(body: Role) {
    return this.service.post(API.ROLE_URL, body).pipe(
      debounceTime(1000)
    );
  }

  update(body: Role) {
    return this.service.put(API.ROLE_URL, body).pipe(
      debounceTime(1000)
    );
  }

  delete(ids): Observable<any> {
    return this.service.delete(API.ROLE_URL, { params: { ids } }).pipe(
      debounceTime(1000)
    );
  }
}

export class Role {
  id?: string;
  name?: string;
  menus?: string[];
}

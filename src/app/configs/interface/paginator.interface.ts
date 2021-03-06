import { Observable } from 'rxjs';
import { Page } from './service.interface';

export interface Paginator {
  total: number;
  pageIndex: number;
  pageSize: number;
  pageSizeOptions: number[];
  sortName: string;
  sortValue: 'descend' | 'ascend' | null;

  sort(sort: { key: string; value: 'descend' | 'ascend' | null }): void;
  page(event?): Observable<Page<any>>;
}

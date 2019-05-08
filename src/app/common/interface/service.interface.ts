import { Observable } from 'rxjs';
import { Page } from 'src/app/config/api';

export interface CommonService<T> {

    info(id): Observable<T>

    page(body?): Observable<Page<T[]>>

    list(): Observable<T[]>

    save(T): Observable<any>

    update(T): Observable<any>

    delete(ids): Observable<any>
}

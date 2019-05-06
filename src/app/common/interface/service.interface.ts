import { Observable } from 'rxjs';
import { Page } from 'src/app/config/api';

export interface CommonService<T> {

    info(): Observable<T>

    page(body?): Observable<Page<T[]>>

    list(): Observable<T[]>

    update(): Observable<any>

    delete(): Observable<any>
}
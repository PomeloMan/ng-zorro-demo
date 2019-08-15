import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

export interface CommonService<T> {

    /**
     * 详情
     * @param id
     */
    info(id): Observable<T>;

    /**
     * 分页
     * @param body 查询条件
     */
    page(body?: any): Observable<Page<T[]>>;

    /**
     * 列表
     * @param body 查询条件
     */
    list(body?: any): Observable<T[]>;

    /**
     * 保存
     * @param T
     */
    save(T): Observable<any>;

    /**
     * 修改
     * @param T
     */
    update(T): Observable<any>;

    /**
     * 删除
     * @param ids
     */
    delete(ids: any[]): Observable<any>;
}

/**
 * options: { observe: 'response' }
 * 后台完整数据返回类型，如果不设置 options则只返回 body内容
 */
export interface ResponseEntity<T> {
    body?: T;
    headers?: HttpHeaders;
    ok?: boolean;
    status?: number;
    statusText?: string;
    type?: number;
    url?: string;
}

/**
 * 后台分页返回数据类型
 */
export interface Page<T> {
    content?: T;
    first?: boolean;
    last?: boolean;
    number?: number;
    numberOfElements?: number;
    size?: number;
    sort?: string;
    totalElements?: number;
    totalPages?: number;
}

import { Paginator } from '../interface/paginator.interface';
import { CommonService } from '../interface/service.interface';

export class AbstractPaginatorComponent<T> implements Paginator {

    results: T[] = [];
    body: any;

    total: number = 0;
    pageIndex: number = 1;
    pageSize: number = 10;
    pageSizeOptions: number[] = [10, 25, 50, 100];
    sortName: string = '';
    sortValue: 'descend' | 'ascend' | null = null;

    constructor(
        protected service: CommonService<T>
    ) {
        this.page();
    }

    sort(sort: { key: string; value: 'descend' | 'ascend' | null }): void {
        this.sortName = sort.key;
        this.sortValue = sort.value;
        this.page();
    }

    page(callback?): void {
        this.service.page({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            sortName: this.sortName,
            sortValue: this.sortValue,
            ...this.body
        }).subscribe(res => {
            this.results = res.content;
            this.pageIndex = res.number + 1;
            this.pageSize = res.size;
            this.total = res.totalElements
        })
    }
}

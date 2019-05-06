import { Paginator } from '../interface/paginator.interface';
import { CommonService } from '../interface/service.interface';

export class AbstractPaginatorComponent<T> implements Paginator {

    datalist: T[] = [];
    params: any;

    total: number = 0;
    pageIndex: number = 1;
    pageSize: number = 10;
    pageSizeOptions: number[] = [10, 25, 50, 100];

    constructor(
        protected service: CommonService<T>
    ) {
        this.page();
    }

    page(event?): void {
        if (event) {

        }
        this.service.page({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            ...this.params
        }).subscribe(res => {
            this.datalist = res.content;
            this.pageIndex = res.number + 1;
            this.pageSize = res.size;
            this.total = res.totalElements
        })
    }
}

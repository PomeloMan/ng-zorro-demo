import { OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/page/main/main.service';
import { Paginator } from '../interface/paginator.interface';

export class AbstractPageComponent implements Paginator {

    body: any = {}; // 查询条件
    total = 0;
    pageIndex = 1;
    pageSize = 10;
    pageSizeOptions: number[] = [10, 25, 50, 100];
    sortName = '';
    sortValue: 'descend' | 'ascend' | null = null;

    constructor(
        // protected router: Router,
        // protected mainService: MainService
    ) { }

    // ngOnInit(): void {
    //     this.mainService.pageChange({
    //         url: this.router.url
    //     });
    // }

    // ngOnDestroy(): void {
    //     this.mainService.pageChange(null);
    // }

    /**
     * 根据字段排序
     * @param sort.key 字段名称
     * @param sort.value descend:倒序 | ascend:顺序 | null:默认
     */
    sort(sort: { key: string; value: 'descend' | 'ascend' | null }) {
        this.sortName = sort.key;
        this.sortValue = sort.value;
        this.page();
    }

    filter(filter: { key: string, value: any }) {
        this.pageIndex = 1; // reset page index
        this.body[filter.key] = filter.value;
        this.page();
    }

    /**
     * 分页查询
     * @param event
     */
    page(event?) { }
}

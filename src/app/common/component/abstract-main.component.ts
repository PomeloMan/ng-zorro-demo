import { Paginator } from '../interface/paginator.interface';
import { Router } from '@angular/router';
import { CommonService } from '../interface/service.interface';
import { MainService } from 'src/app/page/main/main.service';
import { isNullOrUndefined } from 'util';
import { AbstractPageComponent } from './abstract-page.component';

export class AbstractMainComponent<T> extends AbstractPageComponent implements Paginator {

    results: T[] = [];
    body: any = {};

    // Paginator
    total: number = 0;
    pageIndex: number = 1;
    pageSize: number = 10;
    pageSizeOptions: number[] = [10, 25, 50, 100];
    sortName: string = '';
    sortValue: 'descend' | 'ascend' | null = null;
    loading: boolean = true;

    // Selection
    selections: any[] = [{
        text: 'Select All Row',
        onSelect: () => {
            this.checkAll(true);
        }
    }, {
        text: 'Select Odd Row',
        onSelect: () => {
            this.results.filter((item: any) => !item.disabled).forEach((item: any, index) => (this.mapOfCheckedId[item.id] = index % 2 !== 0));
            this.refreshStatus();
        }
    }, {
        text: 'Select Even Row',
        onSelect: () => {
            this.results.filter((item: any) => !item.disabled).forEach((item: any, index) => (this.mapOfCheckedId[item.id] = index % 2 === 0));
            this.refreshStatus();
        }
    }];
    isAllChecked: boolean = false;
    isIndeterminate: boolean = false;
    mapOfCheckedId: { [key: string]: boolean } = {};

    constructor(
        protected router: Router,
        protected service: CommonService<T>,
        protected mainService: MainService
    ) {
        super(router, mainService)
        this.page();
    }

    sort(sort: { key: string; value: 'descend' | 'ascend' | null }): void {
        this.sortName = sort.key;
        this.sortValue = sort.value;
        this.page();
    }

    page(): void {
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
            this.total = res.totalElements;

            this.pageCallback();
            setTimeout(() => {
                this.loading = false;
            }, 500);
        }, error => {
            console.error(error);
            this.loading = false;
        })
    }

    pageCallback() { };

    reset(key?): void {
        if (key) {
            this.body[key] = '';
        } else {
            this.body = {};
        }
        this.page();
    }

    checkAll(value: boolean): void {
        this.results.filter((item: any) => !item.disabled).forEach((item: any) => { this.mapOfCheckedId[item.id] = value });
        this.refreshStatus();
    }

    refreshStatus(): void {
        this.isAllChecked = this.results.filter((item: any) => !item.disabled).every((item: any) => this.mapOfCheckedId[item.id]);
        this.isIndeterminate = this.results.filter((item: any) => !item.disabled).some((item: any) => this.mapOfCheckedId[item.id]) && !this.isAllChecked;
    }

    delete(ids) {
        if (!ids) {
            ids = Object.keys(this.mapOfCheckedId).filter(item => this.mapOfCheckedId[item]);
            if (ids.length == 0) {
                this.mainService.createNotification('warning', null, 'Please select at least one option');
                return;
            }
        }
        this.mainService.showConfirm(() => {
            this.service.delete(ids).subscribe((res) => {
                this.mainService.createNotification('success')
            })
        })
    }

    navigate(url, data?: any[], queryParams?) {
        let commands = [url];
        if (!isNullOrUndefined(data) && data instanceof Array) {
            data.forEach(el => {
                commands.push(el)
            });
        }
        this.router.navigate(commands, {
            queryParams: queryParams
        })
    }
}

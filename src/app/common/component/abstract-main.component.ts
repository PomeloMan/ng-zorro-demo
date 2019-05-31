import { Paginator } from '../interface/paginator.interface';
import { Router } from '@angular/router';
import { CommonService } from '../interface/service.interface';
import { MainService } from 'src/app/page/main/main.service';
import { isNullOrUndefined } from 'util';
import { AbstractPageComponent } from './abstract-page.component';
import { OnInit } from '@angular/core';

export class AbstractMainComponent<T> extends AbstractPageComponent implements Paginator, OnInit {

    results: T[] = [];
    _results: T[] = [];
    body: any = {};

    // Paginator
    total: number = 0;
    pageIndex: number = 1;
    pageSize: number = 10;
    pageSizeOptions: number[] = [10, 25, 50, 100];
    sortName: string = '';
    sortValue: 'descend' | 'ascend' | null = null;
    pageable: boolean = true;
    loading: boolean = true;
    treenode: boolean = false;

    // Selection
    selections: any[] = [{
        text: 'Select All Row',
        onSelect: () => {
            this.checkAll(true);
        }
    }, {
        text: 'Select Odd Row',
        onSelect: () => {
            this.results.filter((item: any) => !item.disabled)
                .forEach((item: any, index) => (this.mapOfCheckedId[item.id] = index % 2 !== 0));
            this.refreshStatus();
        }
    }, {
        text: 'Select Even Row',
        onSelect: () => {
            this.results.filter((item: any) => !item.disabled)
                .forEach((item: any, index) => (this.mapOfCheckedId[item.id] = index % 2 === 0));
            this.refreshStatus();
        }
    }];
    isAllChecked: boolean = false;
    isIndeterminate: boolean = false;
    mapOfCheckedId: { [key: string]: boolean } = {};

    // Collapse
    mapOfExpandedData: { [key: string]: T[] } = {};

    constructor(
        protected router: Router,
        protected service: CommonService<T>,
        protected mainService: MainService
    ) {
        super(router, mainService);
    }

    ngOnInit(): void {
        super.ngOnInit();
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
            this.results = this._results = res.content;
            // this._results = Object.assign({}, res.content);
            this.pageIndex = res.number + 1;
            this.pageSize = res.size;
            this.total = res.totalElements;

            if (typeof callback === 'function') {
                callback();
            }
            this.callback();
        }, error => {
            console.error(error);
        }, () => {
            setTimeout(() => {
                this.loading = false;
            }, 500);
        });
    }

    list(callback?) {
        this.service.list().subscribe((res: T[]) => {
            this.results = this._results = res.slice();
            if (typeof callback === 'function') {
                callback();
            }
            this.callback();
        }, error => {
            console.error(error);
        }, () => {
            setTimeout(() => {
                this.loading = false;
            }, 500);
        });
    }

    callback() {
        if (this.treenode) {
            this.results.forEach((r: any) => {
                this.mapOfExpandedData[r.id] = this.convertTreeToList(r);
            });
        }
    }

    filter() {
        if (this.pageable) {
            this.page();
        } else {
            this.list();
        }
        // this.results = this._results.filter(r => r[key].toLowerCase().includes(this.body[key].toLowerCase()));
    }

    reset(key?): void {
        if (key) {
            this.body[key] = '';
        } else {
            this.body = {};
        }
        if (this.pageable) {
            this.page();
        } else {
            this.list();
        }
    }

    checkAll(value: boolean): void {
        if (this.treenode) {
            // 树形数据展示
            this.checkAllWithChildren(this.results, value);
        } else {
            this.results.filter((item: any) => !item.disabled).forEach((item: any) => { this.mapOfCheckedId[item.id] = value; });
        }
        this.refreshStatus();
    }

    checkAllWithChildren(array, value: boolean) {
        array.forEach(item => {
            if (!item.disabled) {
                this.mapOfCheckedId[item.id] = value;
                if (item.children) {
                    this.checkAllWithChildren(item.children, value);
                }
            }
        });
    }

    refreshStatus(): void {
        if (Object.keys(this.mapOfExpandedData).length > 0) {
            // 树形数据展示
            let results = [];
            const keys = Object.keys(this.mapOfExpandedData);
            keys.forEach(key => {
                results = [...results, ...this.mapOfExpandedData[key]];
            });
            this.isAllChecked = results.filter((item: any) => !item.disabled).every((item: any) => this.mapOfCheckedId[item.id]);
            this.isIndeterminate = results.filter((item: any) => !item.disabled)
                .some((item: any) => this.mapOfCheckedId[item.id]) && !this.isAllChecked;
        } else {
            this.isAllChecked = this.results.filter((item: any) => !item.disabled).every((item: any) => this.mapOfCheckedId[item.id]);
            this.isIndeterminate = this.results.filter((item: any) => !item.disabled)
                .some((item: any) => this.mapOfCheckedId[item.id]) && !this.isAllChecked;
        }
    }

    collapse(array: any[], data: any, $event: boolean): void {
        if ($event === false) {
            if (data.children && array) {
                data.children.forEach(d => {
                    const target = array.find(a => a.id === d.id);
                    target.expand = false;
                    this.collapse(array, target, false);
                });
            } else {
                return;
            }
        }
    }

    convertTreeToList(root: object): T[] {
        const stack: any[] = [];
        const array: any[] = [];
        const hashMap = {};
        stack.push({ ...root, level: 0, expand: false });

        while (stack.length !== 0) {
            const node = stack.pop();
            this.visitNode(node, hashMap, array);
            if (node.children) {
                for (let i = node.children.length - 1; i >= 0; i--) {
                    stack.push({ ...node.children[i], level: node.level + 1, expand: false, parent: node });
                }
            }
        }
        return array;
    }

    visitNode(node: any, hashMap: { [key: string]: any }, array: T[]): void {
        if (!hashMap[node.id]) {
            hashMap[node.id] = true;
            array.push(node);
        }
    }

    delete(ids) {
        if (!ids) {
            ids = Object.keys(this.mapOfCheckedId).filter(item => this.mapOfCheckedId[item]);
            if (ids.length === 0) {
                this.mainService.createNotification('warning', null, 'Please select at least one option');
                return;
            }
        }
        this.mainService.showConfirm(() => {
            this.service.delete(ids).subscribe((res) => {
                this.mainService.createNotification('success');
            });
        });
    }

    navigate(url, data?: any[], queryParams?) {
        const commands = [url];
        if (!isNullOrUndefined(data) && data instanceof Array) {
            data.forEach(el => {
                commands.push(el);
            });
        }
        this.router.navigate(commands, {
            queryParams: queryParams
        });
    }
}

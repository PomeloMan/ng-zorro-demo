import { Paginator } from '../interface/paginator.interface';
import { Router } from '@angular/router';
import { CommonService } from '../interface/service.interface';
import { MainService } from 'src/app/page/main/main.service';
import { isNullOrUndefined } from 'util';
import { AbstractPageComponent } from './abstract-page.component';
import { OnInit } from '@angular/core';

import * as _ from 'lodash';
import { FormGroup } from '@angular/forms';

export class AbstractMainComponent<T> extends AbstractPageComponent implements Paginator, OnInit {

    results: T[] = [];
    body: any = {};

    initial = false;
    // Paginator
    total = 0;
    pageIndex = 1;
    pageSize = 10;
    pageSizeOptions: number[] = [10, 25, 50, 100];
    sortName = '';
    sortValue: 'descend' | 'ascend' | null = null;
    pageable = true;
    loading = true;
    treenode = false;

    // Modal
    isModalVisible = false;
    isModalLoading = false;

    // Selection
    selectionId = 'id';
    selections: any[] = [{
        text: 'Select All Row',
        onSelect: () => {
            this.checkAll(true);
        }
    }, {
        text: 'Select Odd Row',
        onSelect: () => {
            this.results.filter((item: any) => !item.disabled)
                .forEach((item: any, index) => (this.mapOfCheckedId[item[this.selectionId]] = index % 2 !== 0));
            this.refreshStatus();
        }
    }, {
        text: 'Select Even Row',
        onSelect: () => {
            this.results.filter((item: any) => !item.disabled)
                .forEach((item: any, index) => (this.mapOfCheckedId[item[this.selectionId]] = index % 2 === 0));
            this.refreshStatus();
        }
    }];
    isAllChecked = false;
    isIndeterminate = false;
    mapOfCheckedId: { [key: string]: boolean } = {};

    // Collapse
    mapOfExpandedData: { [key: string]: T[] } = {};

    // FormGroup
    form: FormGroup;

    constructor(
        protected router: Router,
        protected service: CommonService<T>,
        protected mainService: MainService
    ) {
        super(router, mainService);
    }

    ngOnInit(): void {
        super.ngOnInit();
        if (this.initial) {
            this.page();
        }
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
            this.results = res.slice();
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
                this.mapOfExpandedData[r[this.selectionId]] = this.convertTreeToList(r);
            });
        }
    }

    filter() {
        if (this.pageable) {
            this.page();
        } else {
            this.list();
        }
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
            this.results.filter((item: any) => !item.disabled).forEach((item: any) => { this.mapOfCheckedId[item[this.selectionId]] = value; });
        }
        this.refreshStatus();
    }

    checkAllWithChildren(array, value: boolean) {
        array.forEach(item => {
            if (!item.disabled) {
                this.mapOfCheckedId[item[this.selectionId]] = value;
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
            this.isAllChecked = results.filter((item: any) => !item.disabled).every((item: any) => this.mapOfCheckedId[item[this.selectionId]]);
            this.isIndeterminate = results.filter((item: any) => !item.disabled)
                .some((item: any) => this.mapOfCheckedId[item[this.selectionId]]) && !this.isAllChecked;
        } else {
            this.isAllChecked = this.results.filter((item: any) => !item.disabled).every((item: any) => this.mapOfCheckedId[item[this.selectionId]]);
            this.isIndeterminate = this.results.filter((item: any) => !item.disabled)
                .some((item: any) => this.mapOfCheckedId[item[this.selectionId]]) && !this.isAllChecked;
        }
    }

    collapse(array: any[], data: any, $event: boolean): void {
        if ($event === false) {
            if (data.children && array) {
                data.children.forEach(d => {
                    const target = array.find(a => a[this.selectionId] === d[this.selectionId]);
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
        if (!hashMap[node[this.selectionId]]) {
            hashMap[node[this.selectionId]] = true;
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

    // Modal
    showModal(callback = () => { }) {
        this.isModalVisible = true;
        callback();
    }

    handleModalOk(): void {
        for (const key of Object.keys(this.form.controls)) {
            this.form.controls[key].markAsDirty();
            this.form.controls[key].updateValueAndValidity();
        }
        if (this.form.valid) {
            this.submitForm(this.form.value);
        }
    }

    handleModalCancel(): void {
        this.form.reset();
        this.isModalVisible = false;
    }

    submitForm(value, callback = () => { }) {
        this.isModalLoading = true;
        _.debounce(() => {
            setTimeout(() => {
                this.service.save(value).subscribe((success: boolean) => {
                    if (success) {
                        callback();
                        if (this.pageable) { this.page(); } else { this.list(); }
                        this.handleModalCancel();
                    }
                }, error => {
                    this.isModalLoading = false;
                }, () => {
                    this.isModalLoading = false;
                });
            }, 1000);
        }, 1000, { leading: true, trailing: false })();
    }

    navigate(url, data?: any[], queryParams?) {
        const commands = [url];
        if (!isNullOrUndefined(data) && data instanceof Array) {
            data.forEach(el => {
                commands.push(el);
            });
        }
        this.router.navigate(commands, {
            queryParams
        });
    }
}

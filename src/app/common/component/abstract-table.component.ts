import { Input } from '@angular/core';
import { Paginator } from '../interface/paginator.interface';
import { AbstractPageComponent } from './abstract-page.component';

export class AbstractTableComponent<T> extends AbstractPageComponent implements Paginator {

    /**
     * nz-table props
     */
    _dataSource: T[] = []; // table dataset
    isFrontPagination = true; // front paging if true
    isTreenode = false; // show treenode mode if true
    isLoading = false; // show loading if true

    /**
     * nz-table select & expand
     */
    selectionId = 'id'; // row id/key
    isAllChecked = false; // all row checked if true
    isIndeterminate = false; // at least one row checked if true
    mapOfCheckedId: { [key: string]: boolean } = {};
    mapOfTreenodeData: { [key: string]: T[] } = {};
    mapOfVisibleColumn: { [key: string]: boolean } = {};

    constructor() {
        super();
    }

    @Input()
    set dataSource(value) {
        this._dataSource = value;
        if (this.isTreenode) {
            // convert dataSource to treenode format
            this._dataSource.forEach((r: any) => {
                this.mapOfTreenodeData[r[this.selectionId]] = this.convertTreeToList(r);
            });
        }
    }

    /**
     * 全选
     * @param value
     */
    checkAll(value: boolean): void {
        if (this.isTreenode) {
            // 树形数据
            this.checkAllWithChildren(this._dataSource, value);
        } else {
            // 默认表格数据
            this._dataSource.filter((item: any) => !item.disabled)
                .forEach((item: any) => { this.mapOfCheckedId[item[this.selectionId]] = value; });
        }
        this.refreshStatus();
    }

    /**
     * 全选(树形数据)
     * @param array
     * @param value
     */
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

    /**
     * 跟新选中状态
     */
    refreshStatus(): void {
        let dataSource = [];
        if (this.isTreenode) {
            // 树形数据
            const keys = Object.keys(this.mapOfTreenodeData);
            keys.forEach(key => {
                dataSource = [...dataSource, ...this.mapOfTreenodeData[key]];
            });
        } else {
            // 默认表格数据
            dataSource = this._dataSource;
        }
        // check status
        this.isAllChecked = dataSource.filter((item: any) => !item.disabled)
            .every((item: any) => this.mapOfCheckedId[item[this.selectionId]]);
        this.isIndeterminate = dataSource.filter((item: any) => !item.disabled)
            .some((item: any) => this.mapOfCheckedId[item[this.selectionId]]) && !this.isAllChecked;
    }

    /**
     * 展开/收缩 行(树形数据)
     * @param array
     * @param data
     * @param $event
     */
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

    /**
     * 构建树形数据
     * @param root
     */
    private convertTreeToList(root: object): T[] {
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

    private visitNode(node: any, hashMap: { [key: string]: any }, array: T[]): void {
        if (!hashMap[node[this.selectionId]]) {
            hashMap[node[this.selectionId]] = true;
            array.push(node);
        }
    }
}

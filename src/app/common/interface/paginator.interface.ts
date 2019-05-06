export interface Paginator {
    total: number;
    pageIndex: number;
    pageSize: number;
    pageSizeOptions: number[];

    page(event?): void;
}

import { OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/page/main/main.service';

export class AbstractPageComponent implements OnInit, OnDestroy {

    constructor(
        protected router: Router,
        protected mainService: MainService
    ) { }

    ngOnInit(): void {
        this.mainService.pageChange({
            url: this.router.url
        });
    }

    ngOnDestroy(): void {
        this.mainService.pageChange(null);
    }
}
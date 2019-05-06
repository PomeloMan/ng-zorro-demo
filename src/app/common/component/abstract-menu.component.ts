import { OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/page/main/main.service';

export class AbstractMenuComponent implements OnInit, OnDestroy {

    constructor(
        protected router: Router,
        protected mainService: MainService
    ) { }

    ngOnInit() {
        this.mainService.pageChange(
            this.mainService.getMenu(this.router.url)
        );
    }

    ngOnDestroy(): void {
        this.mainService.pageChange(
            this.mainService.getMenu(null)
        );
    }
}

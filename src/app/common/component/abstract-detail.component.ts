import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../interface/service.interface';
import { MainService } from 'src/app/page/main/main.service';
import { AbstractPageComponent } from './abstract-page.component';

export class AbstractDetailComponent<T> extends AbstractPageComponent {

    id: any;
    result: T;
    saving: boolean = false;

    constructor(
        protected router: Router,
        protected route: ActivatedRoute,
        protected service: CommonService<T>,
        protected mainService: MainService
    ) {
        super(router, mainService)
        this.id = this.route.snapshot.paramMap.get('id');
        this.info(this.id);
    }

    info(id) {
        this.service.info(id).subscribe(res => {
            this.result = res
        })
    }

    save() {
        this.saving = true;
        this.service.save(this.result).subscribe(res => {
            this.mainService.createNotification('success');
        }, error => {
            console.error(error);
            this.mainService.createNotification('error', null, error);
        }, () => {
            setTimeout(() => {
                this.saving = false
            }, 1000);
        })
    }

    update() {
        this.saving = true;
        this.service.update(this.result).subscribe(res => {
            this.mainService.createNotification('success');
        }, error => {
            console.error(error);
            this.mainService.createNotification('error', null, error);
        }, () => {
            setTimeout(() => {
                this.saving = false
            }, 1000);
        })
    }

    delete(id) {
        this.service.delete([id]).subscribe(res => {
            this.mainService.createNotification('success');
        })
    }
}

import { Router, ActivatedRoute } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import { CommonService } from '../interface/service.interface';
import { MainService } from 'src/app/page/main/main.service';
import { AbstractPageComponent } from './abstract-page.component';
import { FormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'util';

export class AbstractDetailComponent<T> extends AbstractPageComponent implements AfterViewInit {

    id: any;
    result: T;
    validateForm: FormGroup;
    saving: boolean = false;

    constructor(
        protected router: Router,
        protected route: ActivatedRoute,
        protected service: CommonService<T>,
        protected mainService: MainService
    ) {
        super(router, mainService)
        this.id = this.route.snapshot.paramMap.get('id');
    }

    ngAfterViewInit(): void {
        this.info(this.id);
    }

    info(id) {
        this.service.info(id).subscribe((res: any) => {
            res = {
                userName: '123'
            };
            this.result = res;

            if (!isNullOrUndefined(this.validateForm)) {
                for (const key in this.validateForm.controls) {
                    setTimeout(() => {
                        this.validateForm.controls[key].setValue(this.result[key])
                        this.validateForm.controls[key].markAsDirty();
                        this.validateForm.controls[key].updateValueAndValidity();
                    }, 0);
                }
            }

            this.infoCallback();
        })
    }

    infoCallback() { }

    resetForm(event: MouseEvent): void {
        event.preventDefault();
        if (!isNullOrUndefined(this.validateForm)) {
            this.validateForm.reset();
            for (const key in this.validateForm.controls) {
                this.validateForm.controls[key].markAsPristine();
                this.validateForm.controls[key].updateValueAndValidity();
            }
        }
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

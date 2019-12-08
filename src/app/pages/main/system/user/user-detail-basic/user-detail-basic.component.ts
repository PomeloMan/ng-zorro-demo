import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, ValidationErrors, FormGroup } from '@angular/forms';
import { Observer, Observable, forkJoin } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail-basic',
  templateUrl: './user-detail-basic.component.html',
  styleUrls: ['./user-detail-basic.component.scss']
})
export class UserDetailBasicComponent implements OnInit {

  validateForm: FormGroup;
  contactForm: FormGroup;

  id: string;
  result: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: UserService,
    private fb: FormBuilder
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.id = '1';
    this.validateForm = this.fb.group({
      username: [{ value: this.id, disabled: true }, [Validators.required], [this.userNameAsyncValidator]],
      displayName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      comment: ['', [Validators.required]]
    });

    this.contactForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      phone: ['', [Validators.required]]
    });
    // this.validateForm.get('username').disable({ onlySelf: true, emitEvent: true });
  }

  ngOnInit() {
    const $userObservable = this.service.info(this.id);
    forkJoin($userObservable).subscribe(([user]: [any]) => {
      this.result = user;

      // for (const key in this.validateForm.controls) {
      //   setTimeout(() => {
      //     this.validateForm.controls[key].setValue(this.result[key])
      //     this.validateForm.controls[key].markAsDirty();
      //     this.validateForm.controls[key].updateValueAndValidity();
      //   }, 0);
      // }
    });
  }

  submitForm = ($event: any, value?: any) => {
    $event.preventDefault();
    for (const key of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key of Object.keys(this.validateForm.controls)) {
      if (this.validateForm.controls[key].disabled) {
        this.validateForm.controls[key].setValue(this.id);
      }
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  userNameAsyncValidator = (control: FormControl) =>
    Observable.create((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    })
}

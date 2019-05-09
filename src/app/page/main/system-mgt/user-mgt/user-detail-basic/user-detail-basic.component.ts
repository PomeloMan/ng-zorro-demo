import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, ValidationErrors, FormGroup } from '@angular/forms';
import { Observer, Observable, forkJoin } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UserManagementService } from '../user-mgt.service';

@Component({
  selector: 'app-user-detail-basic',
  templateUrl: './user-detail-basic.component.html',
  styleUrls: ['./user-detail-basic.component.scss']
})
export class UserDetailBasicComponent implements OnInit {

  validateForm: FormGroup;

  id: string;
  result: any;
  $resultObservable: Observable<any>

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: UserManagementService,
    private fb: FormBuilder
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.$resultObservable = this.service.info(this.id);
    this.validateForm = this.fb.group({
      username: [{ value: '', disabled: true }, [Validators.required], [this.userNameAsyncValidator]],
      displayName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      comment: ['', [Validators.required]]
    });
    // this.validateForm.get('username').disable({ onlySelf: true, emitEvent: true });
  }

  ngOnInit() {
    forkJoin(this.$resultObservable).subscribe(([result]: [any]) => {
      result = {
        username: 'admin',
        displayName: 'administrator'
      }
      this.result = result;

      for (const key in this.validateForm.controls) {
        setTimeout(() => {
          this.validateForm.controls[key].setValue(this.result[key])
          this.validateForm.controls[key].markAsDirty();
          this.validateForm.controls[key].updateValueAndValidity();
        }, 0);
      }
    })
  }

  submitForm = ($event: any, value: any) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  };

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
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
    });
}

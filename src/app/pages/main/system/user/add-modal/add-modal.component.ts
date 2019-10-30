import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Role } from '../../role/role.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent implements OnInit {

  @Input() roleList: Role[] = [];

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      displayName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      roles: [null, [Validators.required]]
    });
  }

  validate(): void {
    for (const i in this.formGroup.controls) {
      if (this.formGroup.controls[i]) {
        this.formGroup.controls[i].markAsDirty();
        this.formGroup.controls[i].updateValueAndValidity();
      }
    }
  }
}

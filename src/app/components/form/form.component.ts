import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

export enum FormItemType {
  'input', 'input-number', 'select', 'cascader', 'radio', 'radio-button', 'checkbox', 'datepicker'
}

export class FormItem {
  type: FormItemType;
  label: string; // 名称
  name: string;
  value?: any; // 值
  disabled?: boolean;
  external?: any; // type: select { options: any[] }
  // type: datepicker { format: string, showTime: boolean }
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() col: 1 | 2 | 3 | 4 = 2;
  @Input() items: FormItem[] = [];

  @Output() submitted: EventEmitter<any> = new EventEmitter();

  formGroup: FormGroup;
  _formItemType: any = FormItemType;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    const controlsConfig = {};
    this.items.forEach(item => {
      controlsConfig[item.name] = [item.value];
    });
    this.formGroup = this.formBuilder.group(controlsConfig);
  }

  submit(event) {
    const checkboxItems = this.items.filter(item => item.type === this._formItemType.checkbox);
    const value = {...this.formGroup.value};
    checkboxItems.forEach(item => {
      value[item.name] = this.formGroup.value[item.name].filter(i => i.checked).map(i => (i.value));
    });
    this.submitted.emit(value);
  }
}

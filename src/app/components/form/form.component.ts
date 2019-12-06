import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

/**
 * 表单项类型
 */
export enum FormItemType {
  INPUT = 'input',
  INPUT_NUMBER = 'input-number',
  SELECT = 'select',
  CASCADER = 'cascader',
  RADIO = 'radio',
  RADIO_BUTTON = 'radio-button',
  CHECKBOX = 'checkbox',
  DATEPICKER = 'datepicker'
}

/**
 * 表单项
 */
export class FormItem {
  type: FormItemType;
  label: string; // 名称
  name: string;
  value?: any; // 值
  disabled?: boolean;
  external?: any; // type: select { options: any[] }
  // type: datepicker { format: string, showTime: boolean }
}

/**
 * 表单组件，用于构建动态表单
 */
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
  formItemType: any = FormItemType;

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
    const checkboxItems = this.items.filter(item => item.type === this.formItemType.CHECKBOX);
    const value = { ...this.formGroup.value };
    checkboxItems.forEach(item => {
      value[item.name] = this.formGroup.value[item.name].filter(i => i.checked).map(i => (i.value));
    });
    this.submitted.emit(value);
  }
}

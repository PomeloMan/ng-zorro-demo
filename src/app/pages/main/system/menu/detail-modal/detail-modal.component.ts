import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Menu } from '../menu.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {

  @Input() menu: Menu;
  @Input() nodes;

  form: FormGroup;
  expandKeys: any[] = [];

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if (isNullOrUndefined(this.menu)) {
      this.menu = new Menu();
    } else {
      this.menu = {
        ...this.menu,
        parent: this.menu.parent ? this.menu.parent : '0'
      }; // Object.assign({}, menu)
    }
    this.refreshExpandKeys();

    // init form data
    this.form = this.fb.group({
      name: [this.menu.name, [Validators.required]],
      parent: [this.menu.parent],
      type: [this.menu.type, [Validators.required]],
      url: [this.menu.url],
      auth: [this.menu.auth],
      order: [this.menu.order],
      icon: [this.menu.icon]
    });
  }

  submitForm(event, value) {
  }

  private refreshExpandKeys() {
    if (this.menu.parent && this.menu.parent.id) {
      this.expandKeys = ['0'];
      let parent = { ...this.menu.parent };
      while (parent.parent) {
        parent = parent.parent;
        this.expandKeys.push(parent.id);
      }
      this.menu.parent = this.menu.parent.id;
    }
  }
}

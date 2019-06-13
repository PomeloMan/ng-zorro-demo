import { Component, OnInit } from '@angular/core';
import { AbstractMainComponent } from 'src/app/common/component/abstract-main.component';
import { Router } from '@angular/router';
import { MainService } from '../../main.service';
import { Role, RoleManagementService } from './role-mgt.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuManagementService } from '../menu-mgt/menu-mgt.service';
import { convert } from 'src/app/common/util';

@Component({
  selector: 'app-role-mgt',
  templateUrl: './role-mgt.component.html',
  styleUrls: ['./role-mgt.component.scss']
})
export class RoleManagementComponent extends AbstractMainComponent<Role> implements OnInit {

  initial = true;

  role: Role = new Role();
  form: FormGroup;

  menus: any[] = [];

  constructor(
    protected router: Router,
    protected service: RoleManagementService,
    protected mainService: MainService,
    private menuService: MenuManagementService,
    private fb: FormBuilder
  ) {
    super(router, service, mainService);
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      menus: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.initMenuTree();
  }

  initMenuTree() {
    this.menuService.list().subscribe(res => {
      const menus = res.slice();
      this.menus = convert({
        id: '0',
        name: 'Root Menu',
        children: menus
      }, (node) => ({
        ...node,
        title: node.name,
        key: node.id,
        parent: node.parent,
        isLeaf: true
      }), (array, hashMap) => {
        array.forEach(item => {
          item.children = hashMap[item.key];
          if (item.children) {
            delete item.isLeaf;
          }
        });
        return array.filter(item => !item.parent);
      });
    });
  }
}

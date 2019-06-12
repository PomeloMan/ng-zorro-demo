import { Component, OnInit } from '@angular/core';
import { AbstractMainComponent } from 'src/app/common/component/abstract-main.component';
import { Router } from '@angular/router';
import { MainService } from '../../main.service';
import { Role, RoleManagementService } from './role-mgt.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Menu, MenuManagementService } from '../menu-mgt/menu-mgt.service';
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

  nodes: any[] = [{
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
        isLeaf: true
      }
    ]
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
        isLeaf: true
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
        isLeaf: true
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
        isLeaf: true
      }
    ]
  }];

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
    this.initMenus();
  }

  initMenus() {
    this.menuService.list().subscribe(res => {
      const menus = res.slice();
      this.nodes = convert({
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

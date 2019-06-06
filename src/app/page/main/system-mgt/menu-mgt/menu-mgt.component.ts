import { Component, OnInit } from '@angular/core';
import { AbstractMainComponent } from 'src/app/common/component/abstract-main.component';
import { Router } from '@angular/router';
import { MenuManagementService, Menu } from './menu-mgt.service';
import { MainService } from '../../main.service';
import { isNullOrUndefined } from 'util';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { convert } from 'src/app/common/util';

class MenuPageForm {
  name = '';
}

@Component({
  selector: 'app-menu-mgt',
  templateUrl: './menu-mgt.component.html',
  styleUrls: ['./menu-mgt.component.scss']
})
export class MenuManagementComponent extends AbstractMainComponent<Menu> implements OnInit {

  pageable = false;
  treenode = true;
  body: MenuPageForm = new MenuPageForm();
  menu: Menu = new Menu();
  menuForm: FormGroup;

  // treenode
  expandKeys = [];
  nodes = [];

  constructor(
    protected router: Router,
    protected service: MenuManagementService,
    protected mainService: MainService,
    private fb: FormBuilder
  ) {
    super(router, service, mainService);
    this.menuForm = this.fb.group({
      name: [null, [Validators.required]],
      parent: [null],
      type: [null, [Validators.required]],
      url: [null],
      auth: [null],
      order: [null],
      icon: [null]
    });
  }

  ngOnInit(): void {
    super.ngOnInit();

    // const $menusObservable: Observable<Menu[]> = this.service.list();
    // forkJoin([$menusObservable])
    //   .subscribe(([menus]: [Menu[]]) => {
    //     this.results = this._results = menus;
    //     this.results.forEach(r => {
    //       this.mapOfExpandedData[r.id] = this.convertTreeToList(r);
    //     });
    //   }, error => {
    //     console.error(error);
    //   }, () => {
    //     this.loading = false;
    //   });
    this.list(() => {
      // convert menu list to match `nz-tree-select` nzNodes
      this.nodes = convert({
        id: '0',
        name: 'Root Menu',
        children: this.results
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

  showModal(menu) {
    super.showModal(() => {
      if (isNullOrUndefined(menu)) {
        this.menu = new Menu();
      } else {
        this.menu = {
          ...menu,
          parent: menu.parent ? menu.parent : '0'
        }; // Object.assign({}, menu)
      }
      if (this.menu.parent && this.menu.parent.id) {
        this.expandKeys = [];
        let parent = { ...this.menu.parent };
        while (parent.parent) {
          parent = parent.parent;
          this.expandKeys.push(parent.id);
        }
        this.menu.parent = this.menu.parent.id;
      }
    });
  }

  handleModalOk() {
    super.handleModalOk((): Observable<any> => {
      for (const key of Object.keys(this.menuForm.controls)) {
        this.menuForm.controls[key].markAsDirty();
        this.menuForm.controls[key].updateValueAndValidity();
      }
      if (this.menuForm.valid) {
        return this.service.info(1).pipe(
          mergeMap((res: any) => {
            return Observable.create(observer => observer.next(true));
          }),
          catchError((res: any) => {
            return Observable.create(observer => observer.next(false));
          })
        );
      } else {
        return Observable.create(observer => observer.next(false));
      }
    });
  }

  handleModalCancel() {
    super.handleModalCancel(() => {
      this.menuForm.reset();
    });
  }
}

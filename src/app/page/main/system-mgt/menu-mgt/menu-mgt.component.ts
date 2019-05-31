import { Component, OnInit } from '@angular/core';
import { AbstractMainComponent } from 'src/app/common/component/abstract-main.component';
import { Router } from '@angular/router';
import { MenuManagementService, Menu } from './menu-mgt.service';
import { MainService } from '../../main.service';
// import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-menu-mgt',
  templateUrl: './menu-mgt.component.html',
  styleUrls: ['./menu-mgt.component.scss']
})
export class MenuManagementComponent extends AbstractMainComponent<Menu> implements OnInit {

  pageable = false;
  treenode = true;
  body: MenuPageForm = new MenuPageForm();

  constructor(
    protected router: Router,
    protected service: MenuManagementService,
    protected mainService: MainService
  ) {
    super(router, service, mainService);
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
    this.list();
  }

}

class MenuPageForm {
  name: string = '';
}

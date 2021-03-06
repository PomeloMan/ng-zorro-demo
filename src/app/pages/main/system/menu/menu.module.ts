import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { ShareModule } from 'src/app/share/share.module';

import { MenuComponent } from './menu.component';
import { DetailModalComponent } from './detail-modal/detail-modal.component';

import { MenuService } from './menu.service';
import { MenuMockService } from './menu-mock.service';
import { BREADCRUMBS } from 'src/app/constants/breadcrumbs';

const routes: Route[] = [{
  path: '',
  component: MenuComponent,
  data: {
    breadcrumbs: BREADCRUMBS.MENU
  }
}];

@NgModule({
  entryComponents: [
    DetailModalComponent
  ],
  declarations: [
    MenuComponent,
    DetailModalComponent
  ],
  imports: [
    ShareModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    MenuService,
    MenuMockService
  ]
})
export class MenuModule { }

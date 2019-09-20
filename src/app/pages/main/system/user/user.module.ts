import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserService } from './user.service';
import { UserDetailBasicComponent } from './user-detail-basic/user-detail-basic.component';
import { ShareModule } from 'src/app/share/share.module';

const routes: Route[] = [{
  path: '',
  component: UserComponent
}, {
  path: 'user/:id',
  component: UserDetailComponent
}];

@NgModule({
  declarations: [
    UserComponent,
    UserDetailComponent,
    UserDetailBasicComponent
  ],
  imports: [
    ShareModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }

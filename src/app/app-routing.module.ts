import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuardService } from './configs/provider/auth-guard.service';
import { SelectivePreloadingStrategy } from './configs/selective-preloading-strategy';

const routes: Routes = [{
  path: '',
  redirectTo: '/main',
  pathMatch: 'full'
}, {
  path: 'login',
  loadChildren: './pages/login/login.module#LoginModule',
  data: { preload: true }
}, {
  path: 'main',
  loadChildren: './pages/main/main.module#MainModule',
  canLoad: [AuthGuardService]
}, {
  path: '**',
  component: PageNotFoundComponent
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: SelectivePreloadingStrategy,
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule],
  providers: [SelectivePreloadingStrategy]
})
export class AppRoutingModule { }

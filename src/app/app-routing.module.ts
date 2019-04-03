import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page/not-found/not-found.component';

const routes: Routes = [
  {
		path: '',
		redirectTo: '/main',
		pathMatch: 'full'
	},
	// {
	// 	path: 'login',
	// 	loadChildren: './page/login/login.module#LoginModule',
	// 	data: { preload: true }
	// },
	{
		path: 'main',
		loadChildren: './page/main/main.module#MainModule',
		// canLoad: [AuthGuard],
	},
	{
		path: '**',
		component: PageNotFoundComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

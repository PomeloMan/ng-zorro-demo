import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';
// import { AuthGuard } from '../../config/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        // canActivate: [AuthGuard],
        children: [
            {
                path: 'project-mgt.',
                loadChildren: './project-management/project-management.module#ProjectManagementModule',
                data: { preload: true }
            }, {
                path: 'user-mgt.',
                loadChildren: './user-management/user-management.module#UserManagementModule',
                data: { preload: true }
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class MainRoutingModule { }
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './_pages/home/home.component';
import { AuthGuard } from './_helpers';

const authModule = () => import('./_pages/auth/auth.module').then(x => x.AuthModule);
const dashboardModule = () => import('./_pages/users/dashboard.module').then(x => x.DashboardModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: dashboardModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: authModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

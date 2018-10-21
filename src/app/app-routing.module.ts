import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './admin/home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoggedInGuard } from './_guards/logged-in.guard';

const routes: Routes = [{
  path: 'admin',
  canActivate: [AuthGuard],
  children: [{
    path: '',
    component: HomeComponent,
  }]
}, {
  path: 'login',
  component: LoginComponent,
  canActivate: [LoggedInGuard],
}, {
  path: '**',
  redirectTo: '/login',
  pathMatch: 'prefix',
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

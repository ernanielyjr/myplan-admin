import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailDetailComponent } from './admin/email-detail/email-detail.component';
import { EmailListComponent } from './admin/email-list/email-list.component';
import { HomeComponent } from './admin/home/home.component';
import { InvoiceComponent } from './admin/invoice/invoice.component';
import { PostingComponent } from './admin/posting/posting.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoggedInGuard } from './_guards/logged-in.guard';

const routes: Routes = [{
  path: 'admin',
  canActivate: [AuthGuard],
  children: [{
    path: '',
    component: HomeComponent,
  }, {
    path: 'customer-invoices/:customerId',
    component: InvoiceComponent,
  }, {
    path: 'postings/:invoiceId',
    component: PostingComponent,
  }, {
    path: 'emails',
    children: [{
      path: '',
      component: EmailListComponent,
    }, {
      path: ':emailId',
      component: EmailDetailComponent,
    }]
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

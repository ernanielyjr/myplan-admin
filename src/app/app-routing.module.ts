import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailComponent } from './admin/customer-detail/customer-detail.component';
import { CustomerListComponent } from './admin/customer-list/customer-list.component';
import { EmailDetailComponent } from './admin/email-detail/email-detail.component';
import { EmailListComponent } from './admin/email-list/email-list.component';
import { HomeComponent } from './admin/home/home.component';
import { InvoiceListComponent } from './admin/invoice-list/invoice-list.component';
import { PostingListComponent } from './admin/posting-list/posting-list.component';
import { ServiceListComponent } from './admin/service-list/service-list.component';
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
    path: 'customers',
    children: [{
      path: '',
      component: CustomerListComponent,
    }, {
      path: ':customerId',
      children: [{
        path: '',
        component: CustomerDetailComponent,
      }, {
        path: 'invoices',
        component: InvoiceListComponent,
      }, {
        path: 'services',
        component: ServiceListComponent,
      }]
    }]
  }, {
    path: 'invoices',
    children: [{
      path: '',
      component: InvoiceListComponent,
    }, {
      path: ':invoiceId',
      children: [{
        path: 'postings',
        component: PostingListComponent,
      }]
    }]
  }, {
    path: 'services',
    component: ServiceListComponent,
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

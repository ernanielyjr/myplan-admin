import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import pt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CustomerDetailComponent } from './admin/customer-detail/customer-detail.component';
import { CustomerListComponent } from './admin/customer-list/customer-list.component';
import { EmailDetailComponent } from './admin/email-detail/email-detail.component';
import { EmailListComponent } from './admin/email-list/email-list.component';
import { HomeComponent } from './admin/home/home.component';
import { InvoiceListComponent } from './admin/invoice-list/invoice-list.component';
import { PostingListComponent } from './admin/posting-list/posting-list.component';
import { ServiceListComponent } from './admin/service-list/service-list.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoggedInGuard } from './_guards/logged-in.guard';
import { AuthorizeInterceptor } from './_interceptors/authorize.interceptor';
import { TokenInterceptor } from './_interceptors/token.interceptor';
import { MenuHeaderComponent } from './_layout/menu-header/menu-header.component';
import { KeepHtmlPipe } from './_pipes/keep-html.pipe';
import { AlertService } from './_services/alert.service';
import { CustomerService } from './_services/customer.service';
import { InvoiceService } from './_services/invoice.service';
import { PostingService } from './_services/posting.service.';
import { UserService } from './_services/user.service';

registerLocaleData(pt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuHeaderComponent,
    InvoiceListComponent,
    PostingListComponent,
    EmailListComponent,
    EmailDetailComponent,
    KeepHtmlPipe,
    CustomerListComponent,
    CustomerDetailComponent,
    ServiceListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizeInterceptor,
      multi: true
    },
    AlertService,
    UserService,
    CustomerService,
    InvoiceService,
    PostingService,
    AuthGuard,
    LoggedInGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import pt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './admin/home/home.component';
import { InvoiceComponent } from './admin/invoice/invoice.component';
import { PostingComponent } from './admin/posting/posting.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoggedInGuard } from './_guards/logged-in.guard';
import { TokenInterceptor } from './_interceptors/token.interceptor';
import { MenuHeaderComponent } from './_layout/menu-header/menu-header.component';
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
    InvoiceComponent,
    PostingComponent
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
    },
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

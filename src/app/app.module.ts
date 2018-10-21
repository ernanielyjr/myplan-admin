import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './admin/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoggedInGuard } from './_guards/logged-in.guard';
import { UserService } from './_services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    UserService,
    AuthGuard,
    LoggedInGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
  ) { }

  public login(username: string, password: string) {
    const data: AuthPayload.Request = {
      username,
      password
    };
    return this.http
      .post<AuthPayload.Response>(`${environment.baseUrl}/v1/authenticate`, data)
      .pipe(
        tap((response) => {
          this.userService.setToken(response.result.token);
        })
      );
  }

  public logout() {
    this.userService.clearSession();
    this.router.navigateByUrl('/');
  }
}

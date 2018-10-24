import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler) {
    const headers = {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    };

    if (this.userService.isLoggedIn()) {
      headers['Authorization'] = this.userService.getToken();
    }

    const newRequest = request.clone({
      setHeaders: headers
    });

    return next.handle(newRequest);
  }
}

import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { empty, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class AuthorizeInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler) {
    const newRequest = request.clone();

    return next.handle(newRequest).pipe(
      catchError((err) => {
        if ([401, 403].indexOf(err.status) !== -1) {
          this.authService.logout();
          return empty();
        }

        return throwError(null);
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.userService.isLoggedIn()) {
      return true;
    }

    this.router.navigateByUrl('/admin');

    return false;
  }
}

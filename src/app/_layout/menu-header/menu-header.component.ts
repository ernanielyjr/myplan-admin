import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss']
})
export class MenuHeaderComponent implements OnInit {
  public isLogged = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) { }

  public ngOnInit() {
    this.userService.isLoggedInSubject.subscribe(
      (loggedIn) => {
        this.isLogged = loggedIn;
      }
    );
  }

  public logout() {
    if (!confirm('Deseja realmente sair?')) {
      return;
    }

    this.authService.logout();
  }
}

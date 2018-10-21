import { Injectable } from '@angular/core';

const TOKEN_PREFIX = 'AUTH_TOKEN';

@Injectable()
export class UserService {
  public getToken(): string {
    return localStorage.getItem(TOKEN_PREFIX);
  }

  public setToken(token: string): void {
    localStorage.setItem(TOKEN_PREFIX, token);
  }

  public isLogged(): boolean {
    return !!this.getToken();
  }
}

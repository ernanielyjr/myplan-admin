import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const TOKEN_PREFIX = 'AUTH_TOKEN';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor() {
    if (this.getToken()) {
      this.loggedIn.next(true);
    }
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_PREFIX);
  }

  public setToken(token: string): void {
    this.loggedIn.next(true);
    localStorage.setItem(TOKEN_PREFIX, token);
  }

  public isLoggedIn() {
    return !!this.getToken();
  }

  public get isLoggedInSubject() {
    return this.loggedIn.asObservable();
  }

  public clearSession() {
    this.loggedIn.next(false);
    return localStorage.removeItem(TOKEN_PREFIX);
  }
}

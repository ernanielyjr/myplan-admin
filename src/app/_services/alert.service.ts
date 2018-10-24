import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public error(message: string, title?: string) {
    setTimeout(() => {
      alert(message);
    }, 1);
  }
}

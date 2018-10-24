import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DefaultResponse, EmailPayload } from '../_models/request-response.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    private http: HttpClient,
  ) { }

  public list() {
    return this.http
      .get<DefaultResponse<EmailPayload.Email[]>>(`${environment.baseUrl}/v1/email`)
      .pipe(
        map((response) => {
          response.result.sort((a, b) => ((a.sent === b.sent) ? 0 : a.sent ? 1 : -1));
          return response;
        })
      );
  }

  public get(emailId: string) {
    return this.http.get<DefaultResponse<EmailPayload.Email>>(`${environment.baseUrl}/v1/email/${emailId}`);
  }
}

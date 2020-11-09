import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.http.get<DefaultResponse<EmailPayload.Email[]>>(`${environment.baseUrl}/v1/email?limit=50`);
  }

  public get(emailId: string) {
    return this.http.get<DefaultResponse<EmailPayload.Email>>(`${environment.baseUrl}/v1/email/${emailId}`);
  }

  public delete(emailId: string) {
    return this.http.delete<DefaultResponse<EmailPayload.Email>>(`${environment.baseUrl}/v1/email/${emailId}`);
  }
}

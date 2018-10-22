import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DefaultResponse, InvoicePayload } from '../_models/request-response.model';

@Injectable({
  providedIn: 'root'
})
export class PostingService {

  constructor(
    private http: HttpClient,
  ) { }

  public list(invoiceId: string) {
    return this.http.get<DefaultResponse<InvoicePayload.Posting[]>>(`${environment.baseUrl}/v1/invoice/${invoiceId}/posting`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DefaultResponse, InvoicePayload } from '../_models/request-response.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(
    private http: HttpClient,
  ) { }

  private sortInvoices(response: DefaultResponse<InvoicePayload.Invoice[]>): DefaultResponse<InvoicePayload.Invoice[]> {
    response.result.sort((a, b) => {
      const monthA = `0${a.month}`.slice(-2);
      const monthB = `0${b.month}`.slice(-2);

      const dateA = `${a.year}-${monthA}-${a.closed ? 0 : 1}`;
      const dateB = `${b.year}-${monthB}-${b.closed ? 0 : 1}`;

      if (dateA > dateB) {
        return -1;
      }
      if (dateA < dateB) {
        return 1;
      }
      return 0;
    });
    return response;
  }

  public list() {
    return this.http
      .get<DefaultResponse<InvoicePayload.Invoice[]>>(`${environment.baseUrl}/v1/invoice`)
      .pipe(
        map(this.sortInvoices)
      );
  }

  public get(invoiceId: string) {
    return this.http.get<DefaultResponse<InvoicePayload.Invoice>>(`${environment.baseUrl}/v1/invoice/${invoiceId}`);
  }

  public listByCustomer(customerId: string) {
    return this.http
      .get<DefaultResponse<InvoicePayload.Invoice[]>>(`${environment.baseUrl}/v1/customer/${customerId}/invoices`)
      .pipe(
        map(this.sortInvoices)
      );
  }

  public resendEmail(invoiceId: string) {
    return this.http.get<DefaultResponse<any>>(`${environment.baseUrl}/v1/invoice/${invoiceId}/resend`);
  }

  public closeInvoice(invoiceId: string) {
    return this.http.get<DefaultResponse<any>>(`${environment.baseUrl}/v1/invoice/${invoiceId}/close`);
  }

  public deletePosting(invoiceId: string, postingId: string) {
    return this.http.delete<DefaultResponse<any>>(`${environment.baseUrl}/v1/invoice/${invoiceId}/posting/${postingId}`);
  }
}

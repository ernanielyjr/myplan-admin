import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomerPayload, DefaultResponse } from '../_models/request-response.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient,
  ) { }

  public list() {
    return this.http.get<DefaultResponse<CustomerPayload.Customer[]>>(`${environment.baseUrl}/v1/customer`);
  }

  public get(customerId: string) {
    return this.http.get<DefaultResponse<CustomerPayload.Customer>>(`${environment.baseUrl}/v1/customer/${customerId}`);
  }

  public generateFirstInvoice(customerId: string) {
    return this.http.get<DefaultResponse<any>>(`${environment.baseUrl}/v1/first-invoice/${customerId}`);
  }
}

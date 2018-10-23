import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DefaultResponse, ServicePayload } from '../_models/request-response.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private http: HttpClient,
  ) { }

  public list() {
    return this.http.get<DefaultResponse<ServicePayload.Service[]>>(`${environment.baseUrl}/v1/service`);
  }

  public listByCustomer(customerId: string) {
    return this.http.get<DefaultResponse<ServicePayload.Service[]>>(`${environment.baseUrl}/v1/customer/${customerId}/services`);
  }
}
